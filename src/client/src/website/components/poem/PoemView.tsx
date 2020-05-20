import { Card, CardContent, Fade, Typography, } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RoutedComponentProps from '../../../models/RoutedComponentProps';
import connectStore from '../../connectStore';
import PoemHeader from './PoemHeader';
import Stopwatch from './Stopwatch';
import AuthorName from './AuthorName';

const useStyles = makeStyles({
  stopwatch: {
    margin: '0 auto',
  },
});

interface MatchParams {
  id: string
}

const PoemView: React.FC<RoutedComponentProps<MatchParams>> = ({ state, actions, match }) => {
  const classes = useStyles();
  const { poem, isFetching } = state.chosenPoem;

  if (isFetching) {
    return null;
  }
  if (poem === undefined) {
    const { id: poemId } = match.params;
    const { loadPoem } = actions.chosenPoem;

    loadPoem(poemId);
    return null;
  }

  return (
    <Fade in timeout={500}>
      <div>
        <Card variant="outlined">
          {poem.name
          && <PoemHeader header={poem.name} />}
          <CardContent>
            <AuthorName author={poem.author} />
            <Typography
              component="p"
              style={{
                textAlign: 'left',
                whiteSpace: 'pre-line',
              }}
            >
              { poem.text }
            </Typography>
          </CardContent>
        </Card>
        <div className={classes.stopwatch}>
          <Stopwatch />
        </div>
      </div>
    </Fade>
  );
};

export default connectStore(PoemView);
