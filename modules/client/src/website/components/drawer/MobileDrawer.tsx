import { SwipeableDrawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import DrawerContent from './DrawerContent';

const drawerWidth = 240;

interface Props {
  drawerOpened: boolean
  setDrawerOpened(value: boolean): void
}

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 1,
  },
});

const MobileDrawer: React.FC<Props> = ({ drawerOpened, setDrawerOpened }) => {
  const classes = useStyles();

  console.log(`Is opened: ${drawerOpened}`);
  return (
    <SwipeableDrawer
      anchor="left"
      open={drawerOpened}
      onOpen={() => setDrawerOpened(true)}
      onClose={() => setDrawerOpened(false)}
      className={classes.drawer}
      variant="temporary"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <DrawerContent />
    </SwipeableDrawer>
  );
};

export default MobileDrawer;
