import React from 'react';
import {
  Card, CardActions, CardContent, CardHeader, Divider, IconButton, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Poem from './model/poem';

const useStyles = makeStyles({
  root: {
    borderRadius: 10,
    backgroundColor: '#fff',
    // width: 'auto',
    minWidth: '30%',
    maxHeight: '70%',
    overflow: 'scroll',
    padding: 20,
  },
  contentRoot: {
    paddingBottom: 5,
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

  },
  floatingButton: {
    float: 'right',
    display: 'inline-block',
    top: -10,
    right: -5,
  },
  timeButton: {
    marginLeft: 'auto',
  },
  bestTimeLabel: {
    paddingRight: '10px',
  },
});

type ViewMode = 'view' | 'edit';

interface Props {
  poem: Poem,
  mode: ViewMode,
}

const PoemView: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const { poem } = props;

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
        <CardActions className={classes.cardActions} disableSpacing>
          <IconButton className={classes.floatingButton} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton className={classes.floatingButton} aria-label="show timing history">
            <ScheduleIcon />
          </IconButton>
          <IconButton
            aria-label="view"
            onClick={() => console.log('something')}
          >
            <VisibilityIcon />
          </IconButton>
          <Typography className={classes.bestTimeLabel} component="p">
            0:00
          </Typography>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PoemView;
