import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';
import { useLocation } from 'react-router-dom';
import { TagView } from '../../../models/state/AllTagsState';
import TagItemContextMenu from './TagItemContextMenu';

const useStyles = makeStyles({
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
  menuItemText: {
    paddingLeft: '10px',
  },
  menuItemIcon: {
    minWidth: '30px',
  },
});

interface Props {
  selected: boolean,
  tag: TagView,
  changeColor: (newColor: string) => void,
  onClick: () => void
}

interface MousePositionState {
  x: number | null,
  y: number | null
}

const initialMousePos: MousePositionState = {
  x: null,
  y: null,
};

const TagItem: React.FC<Props> = ({
  tag, changeColor, selected, onClick,
}) => {
  const [contextMenuOpened, setContextMenuOpened] = useState(false);
  const [mousePos, setMousePos] = useState(initialMousePos);
  const classes = useStyles();
  const isRootRoute = useLocation().pathname === '/';

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setMousePos({
      x: event.clientX - 2,
      y: event.clientY - 4,
    });
    setContextMenuOpened(true);
  };

  const handleClose = () => {
    setMousePos(initialMousePos);
    setContextMenuOpened(false);
  };

  return (
    <ListItem
      onContextMenu={handleClick}
      selected={selected}
      onClick={() => {
        if (!contextMenuOpened) {
          onClick();
        }
      }}
      button
      disabled={!isRootRoute}
      classes={{ disabled: classes.disabledTag }}
    >
      <LabelIcon htmlColor={tag.color} className={classes.tagIcon} />
      <ListItemText primary={tag.name} />
      <TagItemContextMenu
        contextMenuOpened={contextMenuOpened}
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        handleClose={handleClose}
        onPickColor={() => changeColor('alala')}
      />
    </ListItem>
  );
};

export default TagItem;
