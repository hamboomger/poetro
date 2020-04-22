import { Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import connectStore from '../connectStore';
import AppBar from './AppBar';
import PoemsGrid from './poem/PoemsGrid';
import PoemView from './poem/PoemView';

const App: React.FunctionComponent = () => (
  <Router>
    <AppBar />
    <Container className="App" maxWidth="md">
      <Switch>
        <Route path="/" exact component={PoemsGrid} />
        <Route path="/poem/:id" component={PoemView} />
      </Switch>
    </Container>
  </Router>
);

export default connectStore(App);
