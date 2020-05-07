import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import connectStore from '../connectStore';
import AppBar from './AppBar';
import CreatePoemView from './poem/creation/CreatePoemView';
import PoemsGrid from './poem/PoemsGrid';
import PoemView from './poem/PoemView';

const useStyles = makeStyles({
  appContainer: {
    paddingBottom: 30,
  },
});

const App: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Router>
      <AppBar />
      <Container className={classes.appContainer} maxWidth="md">
        <Switch>
          <Route path="/" exact component={PoemsGrid} />
          <Route path="/create-poem" exact component={CreatePoemView} />
          <Route path="/poem/:id" component={PoemView} />
        </Switch>
      </Container>
    </Router>
  );
};

export default connectStore(App);
