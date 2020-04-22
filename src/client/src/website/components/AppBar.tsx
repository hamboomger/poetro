import React from 'react';
import {
  AppBar as MuiAppBar, Button, Collapse, LinearProgress, Theme, Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import connectStore from '../connectStore';
import ComponentProps from '../../models/ComponentProps';

const useStyles = makeStyles(({ palette }: Theme) => ({
  appBar: {
    marginBottom: 40,
    backgroundColor: palette.primary.main,
  },
}));

const AppBar: React.FC<ComponentProps> = ({ state }) => {
  const classes = useStyles();
  const { isFetching: poemsListFetching } = state.loadedPoems;
  const { isFetching: chosenPoemFetching } = state.chosenPoem;

  const dataIsFetching = poemsListFetching || chosenPoemFetching;

  return (
    <MuiAppBar className={classes.appBar} position="static">
      <Toolbar>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button color="inherit">Login</Button>
      </Toolbar>
      <Collapse in={dataIsFetching}>
        <LinearProgress color="secondary" />
      </Collapse>
    </MuiAppBar>
  );
};

export default connectStore(AppBar);
