/* eslint no-underscore-dangle: 0 */
import {
  Button, ButtonGroup, Card, CardActions, CardContent, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import ComponentProps from '../../../models/ComponentProps';
import connectStore from '../../connectStore';
import PoemHeader from './PoemHeader';

const useStyles = makeStyles({
  root: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    minWidth: '40%',
  },
  contentRoot: {
    minHeight: 200,
    maxHeight: 500,
    paddingBottom: 5,
    overflowY: 'scroll',
  },
  author: {
    textAlign: 'left',
  },
  text: {
    textAlign: 'left',
    whiteSpace: 'pre-line',
  },
  cardActions: {
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  actionButton: {
    width: 100,
  },
});

const PoemModalPreview: React.FunctionComponent<ComponentProps> = ({ state, actions }) => {
  const classes = useStyles();
  const { poem } = state.chosenPoem;
  const { closePoemPreview, deletePoem } = actions.chosenPoem;

  if (!poem) {
    throw Error('chosenPoem is undefined');
  }

  return (
    <Card className={classes.root} variant="outlined">
      {poem.name
        && <PoemHeader header={poem.name} />}
      <CardContent className={classes.contentRoot}>
        <Typography className={classes.author} color="textSecondary" gutterBottom>
          {poem.author}
        </Typography>
        <Typography className={classes.text} component="p">
          {poem.text}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions} disableSpacing>
        <ButtonGroup size="large" color="secondary">
          <Button>
            Memorize
          </Button>
          <Button
            component={Link}
            to={`/poem/${poem._id}`}
            onClick={closePoemPreview}
          >
            View
          </Button>
          <Button
            component={Link}
            to={`/edit-poem/${poem._id}`}
            onClick={closePoemPreview}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              deletePoem(poem._id!);
              closePoemPreview();
            }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default connectStore(PoemModalPreview);
