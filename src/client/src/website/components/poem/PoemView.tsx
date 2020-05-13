import {
  Card, CardContent, CardHeader, Divider, Fade, Typography,
} from '@material-ui/core';
import React from 'react';
import RoutedComponentProps from '../../../models/RoutedComponentProps';
import connectStore from '../../connectStore';

interface MatchParams {
  id: string
}

const PoemView: React.FC<RoutedComponentProps<MatchParams>> = ({ state, actions, match }) => {
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
      <Card variant="outlined">
        { poem.name && (
          <>
            <CardHeader title={poem.name} />
            <Divider />
          </>
        )}
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            { poem.author }
          </Typography>
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
    </Fade>
  );
};

export default connectStore(PoemView);
