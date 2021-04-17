import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';
import { useLocation } from 'react-router-dom';
import { TagView } from '../../../models/state/TagsState';
import TagItemContextMenu from './TagItemContextMenu';
import TagItemColorPicker from './TagItemColorPicker';

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
  tag, selected, onClick,
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [displayContextMenu, setDisplayContextMenu] = useState(false);
  const [mousePos, setMousePos] = useState(initialMousePos);

  const classes = useStyles();
  const isRootRoute = useLocation().pathname === '/';

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setMousePos({
      x: event.clientX - 2,
      y: event.clientY - 4,
    });
    setDisplayContextMenu(true);
  };

  const closeContextMenu = () => {
    setMousePos(initialMousePos);
    setDisplayContextMenu(false);
  };

  return (
    <ListItem
      onContextMenu={handleRightClick}
      selected={selected}
      onClick={() => {
        // do not select tag if clicked while any of the popups is opened
        if (!displayContextMenu && !displayColorPicker) {
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
        contextMenuOpened={displayContextMenu}
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        handleClose={closeContextMenu}
        onPickColor={() => {
          setDisplayColorPicker(true);
        }}
      />
      <TagItemColorPicker
        tag={tag}
        isVisible={displayColorPicker}
        setVisible={setDisplayColorPicker}
      />
    </ListItem>
  );
};

export default TagItem;
