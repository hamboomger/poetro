import { Redirect, Route, RouteProps } from 'react-router-dom';
import React from 'react';
import jwtDecode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import appConstants from '../../lib/appConstants';

interface Props extends RouteProps {
  path: string
}

function tokenNotExpired(jwtToken: string): boolean {
  const payload = jwtDecode<any>(jwtToken);
  const { exp: expirationTimeSec } = payload;
  if (expirationTimeSec && typeof expirationTimeSec === 'number') {
    return (Date.now() / 1000) < expirationTimeSec;
  }
  return false;
}

const PrivateRoute: React.FC<Props> = ({
  path, exact, component,
}) => {
  const [cookies] = useCookies([appConstants.JWT_TOKEN_NAME]);
  const jwtToken = cookies[appConstants.JWT_TOKEN_NAME];
  console.log(`Jwt token: ${jwtToken}`);
  const isLoggedIn = jwtToken && tokenNotExpired(jwtToken);
  return (isLoggedIn
    ? <Route path={path} exact={exact} component={component} />
    : <Redirect to="/login" />
  );
};

export default PrivateRoute;
