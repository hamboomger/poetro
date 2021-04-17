import React from 'react';
import { TwitterPicker } from 'react-color';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Collapse } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import ComponentProps from '../../../models/ComponentProps';
import connectStore from '../../connectStore';

interface Props extends ComponentProps {
  isVisible: boolean
  setVisible: (val: boolean) => void
}

const useStyles = makeStyles({
  colorPickerPopover: {
    position: 'absolute',
    zIndex: 2,
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
});

const TagItemColorPicker: React.FC<Props> = ({ isVisible, setVisible }) => {
  const classes = useStyles();
  return (
    <div className={classes.colorPickerPopover}>
      <Collapse in={isVisible}>
        <div
          className={classes.colorPickerContainer}
          role="presentation"
        >
          <TwitterPicker onChange={(color) => { console.log(`Change color triggered: ${color}`); }} />
          <Button
            onClick={() => {
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
