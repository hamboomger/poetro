import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const GoogleSignInCallback: React.FC<RouteComponentProps> = (props) => {
  console.log(`Props: ${JSON.stringify(props, null, 2)}`);
  return <div />;
};

export default GoogleSignInCallback;
