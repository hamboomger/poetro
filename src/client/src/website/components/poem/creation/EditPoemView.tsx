import {
  Card, CardContent, CardHeader, CardMedia, Container, Fade,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import connectStore from '../../../connectStore';
import { ReactComponent as PoemImg } from './poem.svg';
import banner from './banner.jpeg';
import RoutedComponentProps from '../../../../models/RoutedComponentProps';
import useEffectOnce from '../../../../util/useEffectOnce';
import PoemForm from './PoemForm';

const useStyles = makeStyles({
  cardMedia: {
    height: 200,
  },
  cardHeader: {
    textAlign: 'center',
    width: 'fit-content',
    paddingTop: 30,
    margin: '0 auto',
  },
  cardContent: {
    paddingTop: 0,
  },
  poemImg: {
    width: 40,
    height: 40,
  },
});

interface MatchParams {
  id: string
}

const EditPoemView: React.FC<RoutedComponentProps<MatchParams>> = (props) => {
  const { state, actions, match } = props;
  const { poem, isFetching } = state.chosenPoem;
  const { loadPoem } = actions.chosenPoem;

  useEffectOnce(() => {
    if (!poem && !isFetching) {
      const { id: poemId } = match.params;
      loadPoem(poemId);
    }
  });
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Card>
        <CardMedia
          className={classes.cardMedia}
          image={banner}
          title="Banner"
        />
        <CardHeader
          avatar={
            <PoemImg className={classes.poemImg} />
          }
          className={classes.cardHeader}
          title="Edit poem"
          titleTypographyProps={{ variant: 'h6' }}
        />
        <Fade in={poem !== undefined} timeout={500}>
          <CardContent className={classes.cardContent}>
            <PoemForm poem={poem} />
          </CardContent>
        </Fade>
      </Card>
    </Container>
  );
};

export default connectStore(EditPoemView);
