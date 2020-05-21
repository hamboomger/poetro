import { Container, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { Link } from 'react-router-dom';
import StackGrid from 'react-stack-grid';
import ComponentProps from '../../../models/ComponentProps';
import useEffectOnce from '../../../util/useEffectOnce';
import useWindowDimensions from '../../../util/useWindowDimensions';
import connectStore from '../../connectStore';
import PoemModalWindow from './PoemModalWindow';
import PoemCard from './PoemsGridItem';
import AppDrawer from '../AppDrawer';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(6),
    zIndex: 100,
  },
}));

const ONE_COLUMNS_LIMIT = 600;
const PoemsGrid: React.FC<ComponentProps> = ({ state, actions }) => {
  const classes = useStyles();
  const { data: poems, isFetching, filter } = state.loadedPoems;
  const { fetchPoems } = actions.loadedPoems;
  const { width } = useWindowDimensions();

  useEffectOnce(() => {
    if (!isFetching) {
      fetchPoems();
    }
  });

  const filteredPoems = filter?.tag ? poems.filter((poem) => (
    poem.tags.includes(filter.tag!)
  )) : poems;
  const poemsPreview = filteredPoems.map((poem) => (
    // eslint-disable-next-line no-underscore-dangle
    <PoemCard key={poem._id} poem={poem} />
  ));
  return (
    <Container className="App">
      <AppDrawer />
      <StackGrid
        columnWidth={width > ONE_COLUMNS_LIMIT ? '45%' : '90%'}
        gutterWidth={20}
        gutterHeight={20}
      >
        {poemsPreview}
      </StackGrid>
      <PoemModalWindow />
      <Fab
        component={Link}
        to="/create-poem"
        className={classes.fab}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default connectStore(PoemsGrid);
