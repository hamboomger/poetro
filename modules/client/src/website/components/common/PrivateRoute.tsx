import { Redirect, Route, RouteProps } from 'react-router-dom';
import React from 'react';
import { useCookies } from 'react-cookie';
import appConstants from '../../lib/appConstants';

interface Props extends RouteProps {
  path: string
}

const PrivateRoute: React.FC<Props> = ({
  path, exact, component,
}) => {
  const [cookies] = useCookies([appConstants.JWT_TOKEN_NAME]);
  const isLoggedIn = cookies[appConstants.JWT_TOKEN_NAME] != null;

  return (isLoggedIn
    ? <Route path={path} exact={exact} component={component} />
    : <Redirect to="/login" />
  );
};

export default PrivateRoute;
