import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import TimerIcon from '@material-ui/icons/Timer';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Poem from '../model/poem';
import connectStore from '../../../connectStore';
import ComponentProps from '../../../../models/ComponentProps';

interface Props extends ComponentProps {
  poem: Poem,
  closePoemPreview: () => void,
}

const useStyles = makeStyles({
  memorizeBtn: {
    '&:hover': {
      borderColor: '#00da16',
      backgroundColor: '#f0fff1',
    },
  },
  editBtn: {
  },
  deleteBtn: {
    '&:hover': {
      borderColor: '#ff5f5f',
      backgroundColor: '#fff8f8',
    },
  },
});

const PoemModalPreviewButtons: React.FC<Props> = ({ poem, closePoemPreview, actions }) => {
  const classes = useStyles();
  const { deletePoem } = actions.chosenPoem;
  return (
    <ButtonGroup size="large" color="secondary">
      <Button
        className={classes.memorizeBtn}
        component={Link}
        to={`/poem/${poem._id}`}
        onClick={closePoemPreview}
        startIcon={<TimerIcon />}
      >
        Memorize
      </Button>
      <Button
        className={classes.editBtn}
        component={Link}
        to={`/edit-poem/${poem._id}`}
        onClick={closePoemPreview}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
      <Button
        className={classes.deleteBtn}
        onClick={() => {
          deletePoem(poem._id!);
          closePoemPreview();
        }}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
    </ButtonGroup>
  );
};

export default connectStore(PoemModalPreviewButtons);
