/* eslint no-underscore-dangle: 0 */
import {
  Button, ButtonGroup, Card, CardActions, CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import ComponentProps from '../../../models/ComponentProps';
import connectStore from '../../connectStore';
import PoemHeader from './PoemHeader';
import AuthorName from './AuthorName';
import PoemContent from './PoemContent';

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
        <AuthorName author={poem.author} />
        <PoemContent text={poem.text} />
      </CardContent>
      <CardActions className={classes.cardActions} disableSpacing>
        <ButtonGroup size="large" color="secondary">
          <Button
            component={Link}
            to={`/poem/${poem._id}`}
            onClick={closePoemPreview}
          >
            Memorize
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
