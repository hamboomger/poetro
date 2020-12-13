import { SwipeableDrawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import DrawerContent from './DrawerContent';

const drawerWidth = 240;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 1,
  },
});

const MobileDrawer: React.FC = () => {
  const classes = useStyles();
  const [isOpened, setIsOpened] = useState(false);

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpened}
      onOpen={() => setIsOpened(true)}
      onClose={() => setIsOpened(false)}
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
