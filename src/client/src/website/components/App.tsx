import React from 'react';
import { Container } from '@material-ui/core';
import PoemsGrid from './poem/PoemsGrid';
import PoemModalWindow from './poem/PoemModalWindow';
import AppBar from './AppBar';
import connectStore from '../connectStore';

const App: React.FunctionComponent = () => (
  <>
    <AppBar />
    <Container className="App" maxWidth="md">
      <PoemsGrid />
      <PoemModalWindow />
    </Container>
  </>
);

export default connectStore(App);
