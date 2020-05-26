import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
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
  const { isDesktopClient } = useWindowDimensions();
  const { isFetching, data: tags } = state.allTags;
  const { loadAllTags } = actions.allTags;

  useEffectOnce(() => {
    if (!tags.length && !isFetching) {
      loadAllTags();
    }
  });

  return (
    <Drawer
      className={classes.drawer}
      variant={isDesktopClient ? 'permanent' : 'temporary'}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <DrawerContent />
    </Drawer>
  );
};

export default connectStore(App);
