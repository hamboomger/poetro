import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ToastProvider } from 'react-toast-notifications';
import React from 'react';
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
  return (
    <>
      <Container className={classes.appContainer} maxWidth="md">
        <AppBar />
        <AppDrawer />
        <Switch>
          <PrivateRoute path="/" exact component={PoemsGrid} />
          <PrivateRoute path="/home" exact component={PoemsGrid} />
          <Route path="/create-poem" exact component={CreatePoemView} />
          <Route path="/poem/:id" component={PoemView} />
          <Route path="/edit-poem/:id" component={EditPoemView} />
          <Route path="/stopwatch" component={Stopwatch} />
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
          <Route component={AuthenticatedRoutesContainer} />
        </Switch>
      </div>
    </Router>
  );
};

export default connectStore(App);
