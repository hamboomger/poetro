import React from 'react';
import { Container } from '@material-ui/core';
import PoemsGrid from './poem/PoemsGrid';
import PoemModalWindow from './poem/PoemModalWindow';
import Poem from './poem/model/poem';
import AppBar from './AppBar';

interface State {
  showModal: boolean;
  currentPoem?: Poem;
}

class App extends React.Component<any, State> {
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
    const { showModal, currentPoem } = this.state;

    return (
      <>
        <AppBar />
        <Container className="App" maxWidth="md">
          <PoemsGrid onPoemClick={this.openModal} />
          <PoemModalWindow
            isOpened={showModal}
            closeModal={this.closeModal}
            poem={currentPoem}
          />
        </Container>
      </>
    );
  }
}


export default App;
