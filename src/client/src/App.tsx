import React from 'react';
import './App.css';
import { AppBar, Button, Container, Toolbar } from '@material-ui/core';
import PoemsList from './components/poem/PoemsList';

class App extends React.Component {

  render(){
    return (
      <div>
        <AppBar id="app-bar" position="static">
          <Toolbar>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Container className="App" maxWidth="md">
          <PoemsList/>
        </Container>
      </div>
    );
  }
}

export default App;
