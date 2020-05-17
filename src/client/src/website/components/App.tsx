import { Container, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ToastProvider } from 'react-toast-notifications';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import connectStore from '../connectStore';
import AppBar from './AppBar';
import CreatePoemView from './poem/creation/CreatePoemView';
import PoemsGrid from './poem/PoemsGrid';
import PoemView from './poem/PoemView';
import AppDrawer from './AppDrawer';


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

const App: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Router>
      <ToastProvider>
        <div className={classes.root}>
          <AppBar />
          <AppDrawer />
          <Container className={classes.appContainer} maxWidth="md">
            <Switch>
              <Route path="/" exact component={PoemsGrid} />
              <Route path="/create-poem" exact component={CreatePoemView} />
              <Route path="/poem/:id" component={PoemView} />
            </Switch>
          </Container>
        </div>
      </ToastProvider>
    </Router>
  );
};

export default connectStore(App);
