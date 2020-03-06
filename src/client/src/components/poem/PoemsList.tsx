import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Poem from './model/poem';
import PoemPreview from './PoemPreview';

interface State {
  poems: Poem[];
}

class PoemsList extends React.Component<any, State> {
  constructor(props: Readonly<any>) {
    super(props);

    this.state = {
      poems: [],
    }
  }

  componentDidMount(): void {
    fetch('/api/poems')
      .then(res => res.json())
      .then(poems => this.setState({ poems }))
      .catch(err => console.log(err));
  }

  render(){
    const poemsPreview = this.state.poems.map(poem => {
      return (
          <Grid item xs={6}>
            <PoemPreview poem={poem}/>
          </Grid>
      )
    });
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
