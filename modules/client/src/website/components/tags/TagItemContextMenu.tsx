import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PaletteIcon from '@material-ui/icons/Palette';
import DeleteIcon from '@material-ui/icons/Delete';

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
  contextMenuOpened: boolean,
  handleClose: () => void,
  onPickColor: () => void,
  mouseX: number | null,
  mouseY: number | null
}

const TagItemContextMenu: React.FC<Props> = ({
  contextMenuOpened, handleClose, mouseX, mouseY, onPickColor,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Menu
        keepMounted
        open={contextMenuOpened}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          mouseX !== null && mouseY !== null
            ? { top: mouseY, left: mouseX }
            : undefined
        }
      >
        <MenuItem onClick={onPickColor}>
          <ListItemIcon className={classes.menuItemIcon}>
            <PaletteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Pick color" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon className={classes.menuItemIcon}>
            <DeleteIcon htmlColor="red" fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </div>

  );
};

export default TagItemContextMenu;
