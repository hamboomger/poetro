import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';
import { useLocation } from 'react-router-dom';
import { TagView } from '../../../models/state/AllTagsState';

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
});

interface Props {
  selected: boolean,
  tag: TagView,
  changeColor: (newColor: string) => void,
  onClick: () => void
}

const TagItem: React.FC<Props> = ({
  tag, changeColor, selected, onClick,
}) => {
  const classes = useStyles();
  const isRootRoute = useLocation().pathname === '/';

  return (
    <ListItem
      selected={selected}
      onClick={onClick}
      button
      disabled={!isRootRoute}
      classes={{ disabled: classes.disabledTag }}
      key={tag.name}
    >
      <LabelIcon htmlColor={tag.color} className={classes.tagIcon} />
      <ListItemText primary={tag.name} />
    </ListItem>
  );
};

export default TagItem;
