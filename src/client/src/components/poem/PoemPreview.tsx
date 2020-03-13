import _ from 'lodash';
import React from 'react';
import {
  Card, CardActions, CardContent, CardHeader, Divider, IconButton, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Poem from './model/poem';

const TEXT_PREVIEW_LINES_NUMBER = 2;

const useStyles = makeStyles({
  root: {
    borderRadius: 10,
    backgroundColor: '#fbfbfb',
    transition: '0.4s',
    '&:hover': {
      background: '#fff',
    },
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
    height: '30px',
  },
  timeButton: {
    marginLeft: 'auto',
  },
  bestTimeLabel: {
    paddingRight: '10px',
  },
});

interface Props {
  poem: Poem,
  onClick: (poem: Poem) => void
}

function getFirstLine(text: string) {
  const maxCharacters = 20;
  const firstLine = text.split('\n')[0];
  return firstLine.length > maxCharacters
    ? `${firstLine.substr(0, 20)}...`
    : firstLine;
}

function getTextPreview(text: string) {
  const preview = text.split('\n')
    .slice(0, TEXT_PREVIEW_LINES_NUMBER)
    .join('\n');
  return `${_.includes([',', '.', '!'], preview.slice(-1))
    ? preview.slice(0, -1)
    : preview
  }...`;
}

const PoemPreview: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const { poem } = props;
  const poemName = poem.name || getFirstLine(poem.text);
  const textPreview = getTextPreview(poem.text);
  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader title={poemName} className={classes.header} />
      <Divider />
      <CardContent>
        <Typography className={classes.subheader} color="textSecondary" gutterBottom>
          {poem.author}
        </Typography>
        <Typography className={classes.text} component="p">
          {textPreview}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="view"
          onClick={() => props.onClick(poem)}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton className={classes.timeButton} aria-label="show timing history">
          <ScheduleIcon />
        </IconButton>
        <Typography className={classes.bestTimeLabel} component="p">
            0:00
        </Typography>
      </CardActions>
    </Card>
  );
};

export default PoemPreview;
