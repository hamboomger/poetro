import { Card, CardContent, CardHeader, Container, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ComponentProps from '../../../../models/ComponentProps';
import connectStore from '../../../connectStore';
import CreatePoemForm from './CreatePoemForm';
import { ReactComponent as PoemImg } from './poem.svg';

const useStyles = makeStyles({
  cardHeader: {
    textAlign: 'center',
    width: 'fit-content',
    paddingTop: 20,
    margin: '0 auto',
  },
  cardContent: {
    paddingTop: 0,
  },
  poemImg: {
    width: 30,
    height: 30,
  },
});

const CreatePoemView: React.FC<ComponentProps> = ({ state, actions }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader
          avatar={
            <PoemImg className={classes.poemImg} />
          }
          className={classes.cardHeader}
          title="Create poem"
        />
        <CardContent className={classes.cardContent}>
          <CreatePoemForm />
        </CardContent>
      </Card>
    </Container>
  );
};

export default connectStore(CreatePoemView);
