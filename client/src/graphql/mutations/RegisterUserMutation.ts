import { graphql } from "react-relay";

export const RegisterUserMutation = graphql`
  mutation RegisterUserMutation($idToken: String!, $userType: String) {
    registerUserWithGoogle(idToken: $idToken, userType: $userType) {
      jwt
      userType
    }
  }
`;
