import {
  Drawer, List, ListItem, ListItemText, Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import LabelIcon from '@material-ui/icons/Label';
import connectStore from '../connectStore';
import useWindowDimensions from '../../util/useWindowDimensions';
import ComponentProps from '../../models/ComponentProps';
import useEffectOnce from '../../util/useEffectOnce';

const drawerWidth = 240;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    zIndex: 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    paddingLeft: 10,
  },
  tagIcon: {
    paddingRight: 10,
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
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {tags.map((text) => (
            <ListItem button key={text}>
              <LabelIcon color="primary" className={classes.tagIcon} />
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default connectStore(App);
