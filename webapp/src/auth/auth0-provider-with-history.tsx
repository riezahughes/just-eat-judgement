import React, { FunctionComponent, ReactChild, ReactChildren } from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider, RedirectLoginOptions } from "@auth0/auth0-react";

declare var process: {
  env: {
    REACT_APP_AUTH0_DOMAIN: string;
    REACT_APP_AUTH0_CLIENT_ID: string;
  };
};

interface ChildDeclaration {
  children: ReactChild | ReactChildren;
}

const Auth0ProviderWithHistory = ({ children }: ChildDeclaration) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const history = useHistory();

  const onRedirectCallback = (appState: RedirectLoginOptions) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
