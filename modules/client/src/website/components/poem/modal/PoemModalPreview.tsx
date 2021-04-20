/* eslint no-underscore-dangle: 0 */
import {
  Button, ButtonGroup, Card, CardActions, CardContent,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import ComponentProps from '../../../../models/ComponentProps';
import connectStore from '../../../connectStore';
import PoemHeader from '../PoemHeader';
import AuthorName from '../AuthorName';
import PoemContent from '../PoemContent';
import PoemModalPreviewButtons from './PoemModalPreviewButtons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    height: 'fit-content',
    maxHeight: '80%',
    minWidth: '30%',
    [theme.breakpoints.down('sm')]: {
      minWidth: '80%',
    },
  },
  contentRoot: {
    paddingBottom: 5,
    overflow: 'auto',
  },
  author: {
    textAlign: 'left',
  },
  cardActions: {
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  actionButton: {
    width: 100,
  },
}));

const PoemModalPreview: React.FunctionComponent<ComponentProps> = ({ state, actions }) => {
  const classes = useStyles();
  const { poem } = state.chosenPoem;
  const { closePoemPreview } = actions.chosenPoem;

  if (!poem) {
    throw Error('chosenPoem is undefined');
  }

  return (
    <Card className={classes.root} variant="outlined">
      {poem.name
        && <PoemHeader header={poem.name} />}
      <CardContent className={classes.contentRoot}>
        <AuthorName author={poem.author} />
        <PoemContent text={poem.text} />
      </CardContent>
      <CardActions className={classes.cardActions} disableSpacing>
        <PoemModalPreviewButtons
          poem={poem}
          closePoemPreview={closePoemPreview}
        />
      </CardActions>
    </Card>
  );
};

export default connectStore(PoemModalPreview);
