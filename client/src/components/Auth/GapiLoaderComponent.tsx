import { gapi } from "gapi-script";
import React, { useEffect } from "react";

const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID || "";
const GapiLoaderComponent = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: "profile",
      });
    }

    gapi.load("client:auth2", start);
  }, []);
  return <></>;
};

export default GapiLoaderComponent;
