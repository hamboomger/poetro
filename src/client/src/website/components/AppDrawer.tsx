import {
  Button, Divider, Drawer, List, ListItem, ListItemText, Toolbar,
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
  },
  tagIcon: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  clearSelection: {
    textAlign: 'center',
    margin: '10px auto',
    display: 'block',
  },
});

const App: React.FC<ComponentProps> = ({ state, actions }) => {
  const classes = useStyles();
  const { isDesktopClient } = useWindowDimensions();
  const { isFetching, data: tags } = state.allTags;
  const { filter } = state.loadedPoems;
  const { loadAllTags } = actions.allTags;
  const { applyFilter } = actions.loadedPoems;

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
          {tags.map((tag) => (
            <ListItem
              selected={filter?.tag === tag}
              onClick={() => applyFilter({ tag })}
              button
              key={tag}
            >
              <LabelIcon color="primary" className={classes.tagIcon} />
              <ListItemText primary={tag} />
            </ListItem>
          ))}
        </List>
        <Divider variant="middle" />
        <Button
          color="secondary"
          onClick={() => applyFilter({ tag: undefined })}
          className={classes.clearSelection}
        >
          Clear selection
        </Button>
      </div>
    </Drawer>
  );
};

export default connectStore(App);
