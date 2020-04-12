import _ from 'lodash';
import React from 'react';
import { Container } from '@material-ui/core';
import StackGrid from 'react-stack-grid';
import PoemCard from './PoemsGridItem';
import connectStore from '../../connectStore';
import ComponentProps from '../../../models/ComponentProps';

const PoemsGrid: React.FC<ComponentProps> = ({ state, actions }) => {
  const { data: poems, isFetching } = state.loadedPoems;
  const { fetchPoems } = actions.loadedPoems;

  if (_.isEmpty(poems)) {
    if (!isFetching) {
      fetchPoems();
    }
    return <span>Fetching data...</span>;
  }

  const poemsPreview = poems.map((poem) => (
    // eslint-disable-next-line no-underscore-dangle
    <PoemCard key={poem._id} poem={poem} />
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
};

export default connectStore(PoemsGrid);
