import React from 'react';
import {
  Button, Divider, Fade, List, ListItem, ListItemText, Toolbar, Typography,
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import LabelIcon from '@material-ui/icons/Label';
import { makeStyles } from '@material-ui/core/styles';
import connectStore from '../../connectStore';
import ComponentProps from '../../../models/ComponentProps';

const useStyles = makeStyles({
  drawerContainer: {
    overflow: 'auto',
  },
  homeLink: {
    width: '100%',
    justifyContent: 'left',
    paddingLeft: 25,
    margin: '10px 0 10px 0',
  },
  tagIcon: {
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: '22px',
  },
  clearSelection: {
    textAlign: 'center',
    margin: '10px auto',
    display: 'block',
  },
  disabledTag: {
    opacity: '0.8 !important',
  },
  tagsHeader: {
    margin: '10px 0 10px 24px',
  },
});

const DrawerContent: React.FC<ComponentProps> = ({ state, actions }) => {
  const classes = useStyles();

  const isRootRoute = useLocation().pathname === '/';
  const { filter } = state.loadedPoems;
  const { applyFilter } = actions.loadedPoems;
  const { data: tags } = state.allTags;

  return (
    <div className={classes.drawerContainer}>
      <Toolbar />
      <Button
        className={classes.homeLink}
        component={Link}
        to="/"
        color="inherit"
        size="large"
        startIcon={<HomeIcon />}
      >
        Home
      </Button>
      <Divider />
      <Typography className={classes.tagsHeader} variant="h6">
        Tags
      </Typography>
      <List>
        {tags.map((tag) => (
          <ListItem
            selected={filter?.tag === tag}
            onClick={() => applyFilter({ tag: (filter?.tag !== tag) ? tag : undefined })}
            button
            disabled={!isRootRoute}
            classes={{ disabled: classes.disabledTag }}
            key={tag}
          >
            <LabelIcon color={filter?.tag === tag ? 'primary' : 'secondary'} className={classes.tagIcon} />
            <ListItemText primary={tag} />
          </ListItem>
        ))}
      </List>
      <Fade in={filter?.tag !== undefined}>
        <div>
          <Divider variant="middle" />
          <Button
            color="secondary"
            onClick={() => applyFilter({ tag: undefined })}
            className={classes.clearSelection}
          >
            Clear selection
          </Button>
        </div>
      </Fade>
    </div>
  );
};

export default connectStore(DrawerContent);
