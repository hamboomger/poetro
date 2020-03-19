import React from 'react';
import { Container } from '@material-ui/core';
import Poem from './model/poem';
import PoemPreview from './PoemPreview';
import StackGrid from 'react-stack-grid';

interface Props {
  onPoemClick: (poem: Poem) => void,
}

interface State {
  poems: Poem[];
}

class PoemsList extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);

    this.state = {
      poems: [],
    };
  }

  componentDidMount(): void {
    fetch('/api/poems')
      .then((res) => res.json())
      .then((poems) => this.setState({ poems }))
      .catch((err) => console.log(err));
  }

  render() {
    const { onPoemClick } = this.props;
    const { poems } = this.state;

    const poemsPreview = poems.map((poem) => (
      // eslint-disable-next-line no-underscore-dangle
      <PoemPreview
        poem={poem}
        onClick={onPoemClick}
      />
    ));
    return (
      <Container className="App">
        <StackGrid
          columnWidth="45%"
          gutterWidth={20}
          gutterHeight={20}
        >
          {poemsPreview}
        </StackGrid>
      </Container>
    );
  }
}

export default PoemsList;
