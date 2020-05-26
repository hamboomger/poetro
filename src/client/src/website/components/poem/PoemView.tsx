import {
  Card, CardContent, Fade, Typography,
} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import RoutedComponentProps from '../../../models/RoutedComponentProps';
import PoemHeader from './PoemHeader';
import Stopwatch from './Stopwatch';
import AuthorName from './AuthorName';
import connectStore from '../../connectStore';

const ONE_COLUMN_MAX_PARAGRAPHS_NUMBER = 5;

const useStyles = makeStyles({
  stopwatch: {
    marginBottom: 10,
  },
  poemText: {
    whiteSpace: 'pre-line',
  },
  cardContent: {
    width: 'fit-content',
    display: 'block',
    margin: '0 auto',
  },
  poemTextContainer: {
    paddingTop: 10,
    '& > p': {
      marginTop: 15,
      width: 'max-content',
    },
    '& > p:first-child': {
      marginTop: 0,
    },
  },
  twoColumnsContainer: {
    columnCount: 2,
    columnGap: '10%',
  },
});

interface MatchParams {
  id: string
}

function reformatPoemText(text: string, classes: ClassNameMap): any[] {
  return text.split('\n\n').map((paragraph, index) => (
    // justification: no way to guarantee key uniqueness based on the poem paragraphs itself
    // eslint-disable-next-line react/no-array-index-key
    <Typography className={classes.poemText} component="p" key={index}>
      {paragraph}
    </Typography>
  ));
}

const PoemView: React.FC<RoutedComponentProps<MatchParams>> = ({ state, actions, match }) => {
  const classes = useStyles();
  const { poem, isFetching, hidePoemText } = state.chosenPoem;

  if (isFetching) {
    return null;
  }
  if (poem === undefined) {
    const { id: poemId } = match.params;
    const { loadPoem } = actions.chosenPoem;

    loadPoem(poemId);
    return null;
  }

  const textParagraphs = reformatPoemText(poem.text, classes);
  const shouldDisplayTwoColumns = textParagraphs.length > ONE_COLUMN_MAX_PARAGRAPHS_NUMBER;
  const textContainerClasses = clsx(
    classes.poemTextContainer,
    shouldDisplayTwoColumns && classes.twoColumnsContainer,
  );

  return (
    <div>
      <div className={classes.stopwatch}>
        <Stopwatch targetTimeSec={poem.targetTimeSec} />
      </div>
      <Fade in={!hidePoemText} timeout={500}>
        <Card variant="outlined">
          {poem.name
          && <PoemHeader header={poem.name} alignment="center" />}
          <CardContent className={classes.cardContent}>
            <AuthorName author={poem.author} />
            <div className={textContainerClasses}>
              { textParagraphs }
            </div>
          </CardContent>
        </Card>
      </Fade>
    </div>
  );
};

export default connectStore(PoemView);
