import React from 'react';
import {
  AppBar as MuiAppBar, Button, Collapse, LinearProgress, Theme, Toolbar, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import connectStore from '../connectStore';
import ComponentProps from '../../models/ComponentProps';

const useStyles = makeStyles(({ palette }: Theme) => ({
  appBar: {
    backgroundColor: palette.primary.main,
    zIndex: 100,
    height: 'auto',
  },
  title: {
    flexGrow: 1,
  },
}));

const AppBar: React.FC<ComponentProps> = ({ state }) => {
  const classes = useStyles();
  const { isFetching: poemsListFetching } = state.loadedPoems;
  const { isFetching: chosenPoemFetching } = state.chosenPoem;
  const { isFetching: allTagsFetching } = state.allTags;

  const dataIsFetching = poemsListFetching || chosenPoemFetching || allTagsFetching;

  return (
    <MuiAppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Poetro
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
      <Collapse in={dataIsFetching}>
        <LinearProgress color="secondary" />
      </Collapse>
    </MuiAppBar>
  );
};

export default connectStore(AppBar);
