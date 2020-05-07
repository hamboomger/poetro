/* eslint no-underscore-dangle: 0 */
import {
  Button, Card, CardActions, CardContent, CardHeader, Divider, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import ComponentProps from '../../../models/ComponentProps';
import connectStore from '../../connectStore';

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
  header: {
    fontSize: 10,
    textAlign: 'left',
    spacing: 10,
    paddingTop: '6px',
    paddingBottom: '6px',
  },
  subheader: {
    textAlign: 'left',
  },
  text: {
    textAlign: 'left',
    whiteSpace: 'pre-line',
  },
  cardActions: {
    justifyContent: 'space-evenly',
  },
  actionButton: {
    width: 100,
  },
});

const PoemModalPreview: React.FunctionComponent<ComponentProps> = ({ state, actions }) => {
  const classes = useStyles();
  const { poem } = state.chosenPoem;
  const { closePoemPreview, deletePoem } = actions.chosenPoem;

  if (poem === undefined) {
    throw Error('chosenPoem is undefined');
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader title={poem.name} className={classes.header} />
      <Divider />
      <CardContent className={classes.contentRoot}>
        <Typography className={classes.subheader} color="textSecondary" gutterBottom>
          {poem.author}
        </Typography>
        <Typography className={classes.text} component="p">
          {poem.text}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions} disableSpacing>
        <Button className={classes.actionButton} variant="contained" color="primary" disableElevation>
          Memorize
        </Button>
        <Button
          className={classes.actionButton}
          variant="contained"
          color="secondary"
          disableElevation
          component={Link}
          to={`/poem/${poem._id}`}
          onClick={closePoemPreview}
        >
          View
        </Button>
        <Button className={classes.actionButton} variant="contained" color="primary" disableElevation>
          Edit
        </Button>
        <Button
          className={classes.actionButton}
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => {
            deletePoem(poem._id);
            closePoemPreview();
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default connectStore(PoemModalPreview);
