import {
  Card, CardContent, CardHeader, CardMedia, Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ComponentProps from '../../../../models/ComponentProps';
import connectStore from '../../../connectStore';
import PoemForm from './PoemForm';
import { ReactComponent as PoemImg } from './poem.svg';
import banner from './banner.jpeg';

const useStyles = makeStyles({
  cardMedia: {
    height: 200,
  },
  cardHeader: {
    textAlign: 'center',
    width: 'fit-paper',
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

const CreatePoemView: React.FC<ComponentProps> = () => {
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
          title="Create poem"
          titleTypographyProps={{ variant: 'h6' }}
        />
        <CardContent className={classes.cardContent}>
          <PoemForm />
        </CardContent>
      </Card>
    </Container>
  );
};

export default connectStore(CreatePoemView);
