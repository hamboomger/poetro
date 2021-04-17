import React, { useState } from 'react';
import { TwitterPicker } from 'react-color';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Collapse } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import ComponentProps from '../../../models/ComponentProps';
import connectStore from '../../connectStore';
import { TagView } from '../../../models/state/TagsState';

interface Props extends ComponentProps {
  tag: TagView
  isVisible: boolean
  setVisible: (val: boolean) => void
}

const useStyles = makeStyles({
  colorPickerPopover: {
    position: 'absolute',
    zIndex: 3,
    top: '50px',
  },
  colorPickerContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    width: '100%',
    borderRadius: 0,
  },
  blocker: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    content: ' ',
    background: 'rgba(0,0,0,.1)',
    zIndex: 0,
  },
});

const TagItemColorPicker: React.FC<Props> = ({
  tag, isVisible, setVisible, actions,
}) => {
  const classes = useStyles();
  const [chosenColor, setChosenColor] = useState<string>();
  const { changeTagColor } = actions.tags;

  return (
    <div className={classes.colorPickerPopover}>
      <Collapse in={isVisible}>
        <div className={classes.blocker} />
        <div
          className={classes.colorPickerContainer}
          role="presentation"
        >
          <TwitterPicker onChange={(color) => {
            setChosenColor(color.hex);
            console.log(`Change color triggered: ${color}`);
          }}
          />
          <Button
            onClick={() => {
              if (chosenColor !== undefined) {
                changeTagColor(tag.id, chosenColor);
              }
              setVisible(false);
            }}
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DoneIcon />}
          >
            Select
          </Button>
          <Button
            onClick={() => {
              setVisible(false);
            }}
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
        </div>
      </Collapse>
    </div>
  );
};

export default connectStore(TagItemColorPicker);
