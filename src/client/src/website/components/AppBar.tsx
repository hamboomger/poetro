import React from 'react';
import { AppBar as MuiAppBar, Button, Theme, Toolbar, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }: Theme) => ({
  appBar: {
    marginBottom: 40,
    backgroundColor: palette.primary.main,
  },
}));

function AppBar() {
  const classes = useStyles();

  return (
    <MuiAppBar className={classes.appBar} position="static">
      <Toolbar>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
