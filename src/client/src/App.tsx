import React from 'react';
import {
  AppBar, Button, Container, Toolbar, WithStyles, withStyles,
} from '@material-ui/core';
import PoemsList from './components/poem/PoemsList';
import PoemModal from './components/poem/PoemModal';
import Poem from './components/poem/model/poem';

const styles = {
  root: {
    marginBottom: 30,
    backgroundColor: '#ad3bdc',
  },
};

interface State {
  showModal: boolean;
  currentPoem?: Poem;
}

class App extends React.Component<WithStyles<typeof styles>, State> {
  constructor(props: Readonly<any>) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  openModal(poem: Poem) {
    this.setState({
      currentPoem: poem,
      showModal: true,
    });
  }

  render() {
    const { classes } = this.props;
    const { showModal, currentPoem } = this.state;

    return (
      <>
        <AppBar className={classes.root} position="static">
          <Toolbar>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Container className="App" maxWidth="md">
          <PoemsList onPoemClick={this.openModal} />
          <PoemModal
            isOpened={showModal}
            closeModal={this.closeModal}
            poem={currentPoem}
          />
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(App);
