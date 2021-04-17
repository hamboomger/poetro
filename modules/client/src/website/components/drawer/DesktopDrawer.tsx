import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import DrawerContent from './DrawerContent';

const drawerWidth = 240;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    overflow: 'visible',
    zIndex: 1,
  },
});

const DesktopDrawer: React.FC = () => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <DrawerContent />
    </Drawer>
  );
};

export default DesktopDrawer;
