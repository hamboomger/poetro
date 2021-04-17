import React from 'react';
import {
  Button, Divider, Fade, List, Toolbar, Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import connectStore from '../../connectStore';
import ComponentProps from '../../../models/ComponentProps';
import TagItem from '../tags/TagItem';

const useStyles = makeStyles({
  drawerContainer: {
    overflow: 'visible',
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
          <TagItem
            tag={tag}
            selected={filter?.tag === tag.name}
            onClick={() => {
              applyFilter({ tag: (filter?.tag !== tag.name) ? tag.name : undefined });
            }}
            changeColor={(newColor: string) => { console.log(`New color picked: ${newColor}`); }}
            key={tag.name}
          />
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
