import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ToastProvider } from 'react-toast-notifications';
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, useLocation,
} from 'react-router-dom';
import connectStore from '../connectStore';
import AppBar from './AppBar';
import CreatePoemView from './poem/creation/CreatePoemView';
import PoemsGrid from './poem/PoemsGrid';
import PoemView from './poem/PoemView';
import EditPoemView from './poem/creation/EditPoemView';
import Stopwatch from './poem/Stopwatch';
import LoginView from './login/LoginView';
import AppDrawer from './drawer/AppDrawer';
import RegisterView from './login/RegisterView';

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
          <Route path="/home" exact component={PoemsGrid} />
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
      <ToastProvider>
        <div className={classes.root}>
          <Switch>
            <Route path="/login" exact component={LoginView} />
            <Route path="/register" exact component={RegisterView} />
            <Route component={AuthenticatedRoutesContainer} />
          </Switch>
        </div>
      </ToastProvider>
    </Router>
  );
};

export default connectStore(App);
