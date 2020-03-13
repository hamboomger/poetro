import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Poem from './model/poem';
import PoemPreview from './PoemPreview';

interface Props {
  onPoemClick: (poem: Poem) => void
}

interface State {
  poems: Poem[];
}

class PoemsList extends React.Component<Props, State> {
  constructor(props: Readonly<any>) {
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
      <Grid item xs={6} key={poem._id}>
        <PoemPreview
          poem={poem}
          onClick={onPoemClick}
        />
      </Grid>
    ));
    return (
      <Container className="App">
        <Grid container spacing={3}>
          {poemsPreview}
        </Grid>
      </Container>
    );
  }
}

export default PoemsList;
