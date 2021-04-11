import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import connectStore from './website/connectStore';
import AppBar from './website/components/AppBar';
import CreatePoemView from './website/components/poem/creation/CreatePoemView';
import PoemsGrid from './website/components/poem/PoemsGrid';
import PoemView from './website/components/poem/PoemView';
import EditPoemView from './website/components/poem/creation/EditPoemView';
import Stopwatch from './website/components/poem/Stopwatch';
import LoginView from './website/components/login/LoginView';
import AppDrawer from './website/components/drawer/AppDrawer';
import RegisterView from './website/components/login/RegisterView';
import PrivateRoute from './website/components/common/PrivateRoute';
import GoogleSignInCallback from './website/components/login/google/GoogleSignInCallback';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  appContainer: {
    marginTop: 100,
    paddingBottom: 30,
    zIndex: 10,
  },
});

const AuthenticatedRoutesContainer: React.FC = () => {
  const classes = useStyles();
  const [drawerOpened, setDrawerOpened] = useState(false);
  return (
    <>
      <Container className={classes.appContainer} maxWidth="md">
        <AppBar setDrawerOpened={setDrawerOpened} />
        <AppDrawer drawerOpened={drawerOpened} setDrawerOpened={setDrawerOpened} />
        <Switch>
          <PrivateRoute path="/" exact component={PoemsGrid} />
          <PrivateRoute path="/home" exact component={PoemsGrid} />
          <PrivateRoute path="/create-poem" exact component={CreatePoemView} />
          <PrivateRoute path="/poem/:id" component={PoemView} />
          <PrivateRoute path="/edit-poem/:id" component={EditPoemView} />
          <PrivateRoute path="/stopwatch" component={Stopwatch} />
        </Switch>
      </Container>
    </>
  );
};

const App: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <Switch>
          <Route path="/login" exact component={LoginView} />
          <Route path="/register" exact component={RegisterView} />
          <Route path="/google-callback" exact component={GoogleSignInCallback} />
          <Route component={AuthenticatedRoutesContainer} />
        </Switch>
      </div>
    </Router>
  );
};

export default connectStore(App);
