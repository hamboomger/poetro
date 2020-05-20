import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Divider, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TimerIcon from '@material-ui/icons/Timer';

const useStyles = makeStyles(() => ({
  root: {
    margin: '10px 0 0 0',
    borderRadius: 6,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  timerIcon: {
    marginRight: 6,
  },
  content: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    '& > button, > span': {
      width: '100%',
    },
    '& > button': {
      height: '100%',
    },
  },
  currentTime: {
    fontSize: 20,
  },
}));

const Stopwatch: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const lastTimeoutId = useRef<any>();

  const classes = useStyles();
  useEffect(() => {
    if (!isPaused) {
      lastTimeoutId.current = setTimeout(() => setCounter(counter + 1000), 1000);
    }
    if (isPaused && counter === 0) {
      clearTimeout(lastTimeoutId.current);
    }
  }, [counter, isPaused]);

  const timerFormatted = moment.utc(counter).format('mm:ss');

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <TimerIcon className={classes.timerIcon} />
        <Typography variant="h6">
          Timer
        </Typography>
      </div>
      <Divider />
      <div className={classes.content}>
        <Button
          onClick={() => setIsPaused(!isPaused)}
          color="primary"
        >
          {isPaused ? 'Start' : 'Pause'}
        </Button>
        <Divider orientation="vertical" flexItem />
        <Typography
          variant="button"
          className={classes.currentTime}
        >
          {timerFormatted}
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Button
          color="secondary"
          disabled={counter === 0}
          onClick={() => {
            setCounter(0);
            setIsPaused(true);
          }}
        >
          Reset
        </Button>
      </div>
    </Paper>
  );
};

export default Stopwatch;
