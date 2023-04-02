import React from "react";
import GoogleLogin, {
  GoogleLoginProps,
  GoogleLoginResponse,
} from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import dynamic from "next/dynamic";

const GapiLoaderComponent = dynamic(() => import("./GapiLoaderComponent"), {
  ssr: false,
});

const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID || "";

const GoogleLoginButton: React.FC<{}> = () => {
  const { handleLogin, isAuthenticated } = useAuth();
  const onSuccess: GoogleLoginProps["onSuccess"] = (response) => {
    if (response.code === undefined)
      handleLogin(response as GoogleLoginResponse);
  };

  const onFailure: GoogleLoginProps["onFailure"] = async (res) => {
    console.log("GOOGLE LOGIN FAILED", res);
  };

  return (
    <>
      <GapiLoaderComponent />
      <GoogleLogin
        clientId={clientId}
        buttonText="Log in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        disabled={isAuthenticated}
        render={({ onClick, disabled }) => (
          <button className="gap-2 btn" onClick={onClick} disabled={disabled}>
            <FcGoogle />
            Login with Google
          </button>
        )}
      />
    </>
  );
};

export default GoogleLoginButton;
