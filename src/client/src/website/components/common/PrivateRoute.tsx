import { Redirect, Route, RouteProps } from 'react-router-dom';
import React from 'react';
import { useCookies } from 'react-cookie';

interface Props extends RouteProps {
  path: string
}

const PrivateRoute: React.FC<Props> = ({
  path, exact, component,
}) => {
  const [cookies] = useCookies(['authToken']);
  const isLoggedIn = cookies.authToken != null;

  return (isLoggedIn
    ? <Route path={path} exact={exact} component={component} />
    : <Redirect to="/login" />
  );
};

export default PrivateRoute;
