import { Route, Redirect, RouteProps } from 'react-router-dom';
import React from 'react';
import ComponentProps from '../../../models/ComponentProps';

interface Props extends ComponentProps, RouteProps {
}

const PrivateRoute: React.FC<Props> = ({
  state, path,
}) => {
  const isLoggedIn = false;
  return (isLoggedIn
    ? <Route path={path} />
    : <Redirect to="/login" />
  );
};

export default PrivateRoute;
