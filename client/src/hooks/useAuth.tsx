import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { GoogleLoginResponse } from "react-google-login";
import { AuthUserType, UserProfile } from "../services/auth-service/types";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { RegisterUserMutation } from "../graphql/mutations";
import { CurrentUserQuery } from "../graphql/queries";
import { CurrentUserQuery as CurrentUserQueryType } from "../graphql/queries/__generated__/CurrentUserQuery.graphql";
import { RegisterUserMutation as RegisterUserMutationType } from "../graphql/mutations/__generated__/RegisterUserMutation.graphql";
import {
  PERSISTED_AUTH_STATE_ID,
  persistState,
  retrievePersistedState,
} from "../services/auth-service";

const AuthContext = createContext<AuthContextValues>({
  authStatus: "not_authenticated",
  userProfile: undefined,
  isAuthenticated: false,
  handleLogin: () => {},
  handleLogout: () => {},
  setUserType: (
    value:
      | "student"
      | "teacher"
      | ((prev: "student" | "teacher") => "student" | "teacher")
  ) => {},
});

type AuthState = {
  jwt?: string;
  authStatus: AuthUserType;
  userProfile?: UserProfile;
  isAuthenticated: boolean;
};

export interface AuthContextValues extends AuthState {
  handleLogin: (response: GoogleLoginResponse) => void;
  handleLogout: () => void;
  setUserType: React.Dispatch<React.SetStateAction<"student" | "teacher">>;
}

type Action =
  | { type: "authenticate_new_user"; jwt: string; userType: AuthUserType }
  | { type: "logout" }
  | { type: "new_user_verified"; userType: AuthUserType }
  | { type: "load_new_user_profile"; userProfile: UserProfile }
  | { type: "load_existing_auth_state" };

const initialAuthState: AuthState = {
  authStatus: "not_authenticated",
  isAuthenticated: false,
};

const authReducerHandler = (state: AuthState, action: Action): AuthState => {
  if (action.type === "authenticate_new_user") {
    return {
      isAuthenticated: true,
      jwt: action.jwt,
      authStatus: action.userType,
      userProfile: undefined,
    };
  } else if (action.type === "logout") {
    return {
      isAuthenticated: false,
      userProfile: undefined,
      authStatus: "not_authenticated",
    };
  } else if (action.type === "load_new_user_profile") {
    if (state.isAuthenticated) {
      return { ...state, userProfile: action.userProfile };
    }
  } else if (action.type === "new_user_verified") {
    return { ...state, authStatus: action.userType };
  } else if (action.type === "load_existing_auth_state") {
    const persistedState = retrievePersistedState(PERSISTED_AUTH_STATE_ID);
    if (persistedState) {
      if (
        persistedState.isAuthenticated &&
        persistedState.jwt &&
        persistedState.authStatus
      ) {
        return {
          isAuthenticated: persistedState.isAuthenticated === true,
          authStatus: persistedState.authStatus as AuthUserType,
          jwt: persistedState.jwt,
          userProfile: persistedState.userProfile as UserProfile,
        };
      } else {
        console.log(
          "loaded defualt state because of validation error for stored state"
        );
        return initialAuthState;
      }
    }
  }
  return state;
};

const authReducer = (state: AuthState, action: Action): AuthState => {
  const updatedAuthState = authReducerHandler(state, action);
  persistState(updatedAuthState, PERSISTED_AUTH_STATE_ID);
  return updatedAuthState;
};

export const AuthContextProvider: React.FC = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);
  const [commitSignUp, isSignUpInFlight] =
    useMutation<RegisterUserMutationType>(RegisterUserMutation);
  const [userType, setUserType] = useState<"student" | "teacher">("teacher");
  const [currentUserDataFetchKey, setCurrentUserDataFetchKey] =
    useState<number>(0);
  const currentUserData = useLazyLoadQuery<CurrentUserQueryType>(
    CurrentUserQuery,
    {},
    { fetchPolicy: "network-only", fetchKey: currentUserDataFetchKey }
  );

  useEffect(() => {
    dispatch({ type: "load_existing_auth_state" });
  }, []);

  useEffect(() => {
    setCurrentUserDataFetchKey((p) => p + 1);
  }, [authState.authStatus]);

  // load the user using the query if we have a jwt but the user doesn't exist
  useEffect(() => {
    if (
      authState.isAuthenticated &&
      authState.jwt &&
      authState.userProfile === undefined
    ) {
      if (currentUserData.currentUser) {
        dispatch({
          type: "load_new_user_profile",
          userProfile: currentUserData.currentUser,
        });
      } else {
        console.log("Invalid JWT tokens / or local auth state, logging out");
        dispatch({ type: "logout" });
      }
    }
  }, [currentUserData]);

  const handleLogin = async (response: GoogleLoginResponse) => {
    const idToken = response.tokenObj.id_token;
    commitSignUp({
      variables: { idToken, userType },
      onCompleted(response, errors) {
        if (response.registerUserWithGoogle) {
          const { jwt, userType } = response.registerUserWithGoogle;
          dispatch({
            type: "authenticate_new_user",
            jwt,
            userType: userType as AuthUserType,
          });
        } else {
          console.error("Login attempt failed");
        }
      },
    });
  };

  const handleLogout = async () => {
    dispatch({ type: "logout" });
  };

  const value: AuthContextValues = {
    ...authState,
    handleLogin,
    handleLogout,
    setUserType,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
  return useContext(AuthContext);
}
