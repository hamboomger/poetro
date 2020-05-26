import { SwipeableDrawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import connectStore from '../../connectStore';
import useWindowDimensions from '../../../util/useWindowDimensions';
import ComponentProps from '../../../models/ComponentProps';
import useEffectOnce from '../../../util/useEffectOnce';
import DrawerContent from './DrawerContent';

const drawerWidth = 240;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    zIndex: 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
});

const App: React.FC<ComponentProps> = ({ state, actions }) => {
  const classes = useStyles();
  const [isOpened, setIsOpened] = useState(false);
  const { isDesktopClient } = useWindowDimensions();
  const { isFetching, data: tags } = state.allTags;
  const { loadAllTags } = actions.allTags;

  useEffectOnce(() => {
    if (!tags.length && !isFetching) {
      loadAllTags();
    }
  });

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpened}
      onOpen={() => setIsOpened(true)}
      onClose={() => setIsOpened(false)}
      className={classes.drawer}
      variant={isDesktopClient ? 'permanent' : 'temporary'}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <DrawerContent />
    </SwipeableDrawer>
  );
};

export default connectStore(App);
