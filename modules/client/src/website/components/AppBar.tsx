import React from 'react';
import {
  AppBar as MuiAppBar,
  Button,
  Collapse,
  IconButton,
  LinearProgress,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import connectStore from '../connectStore';
import ComponentProps from '../../models/ComponentProps';

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  appBar: {
    backgroundColor: palette.primary.main,
    zIndex: 100,
    height: 'auto',
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: spacing(2),
  },
}));

const AppBar: React.FC<ComponentProps> = ({ state }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { isFetching: poemsListFetching } = state.loadedPoems;
  const { isFetching: chosenPoemFetching } = state.chosenPoem;
  const { isFetching: allTagsFetching } = state.allTags;

  const dataIsFetching = poemsListFetching || chosenPoemFetching || allTagsFetching;

  return (
    <MuiAppBar className={classes.appBar} position="fixed">
      <Toolbar>
        {isMobile
          && (
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          )}
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