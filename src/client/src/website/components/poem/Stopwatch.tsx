import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Divider, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    margin: '0',
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
    '& > button, > span, > div': {
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

interface Props {
  targetTimeSec: number,
}

const Stopwatch: React.FC<Props> = ({ targetTimeSec }) => {
  const [counter, setCounter] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const lastTimeoutId = useRef<any>();

  const classes = useStyles();
  useEffect(() => {
    if (!isPaused) {
      lastTimeoutId.current = setTimeout(() => setCounter(counter + 1000), 1000);
    }
    if (isPaused) {
      clearTimeout(lastTimeoutId.current);
    }
  }, [counter, isPaused]);

  const currentTimeFormatted = moment.utc(counter).format('mm:ss');
  const targetTimeFormatted = moment.utc(targetTimeSec * 1000).format('mm:ss');

  return (
    <Paper variant="outlined" className={classes.root}>
      <div className={classes.content}>
        <Button
          onClick={() => setIsPaused(!isPaused)}
          color={isPaused ? 'primary' : 'secondary'}
        >
          {isPaused ? 'Start' : 'Pause'}
        </Button>
        <Divider orientation="vertical" flexItem />
        <div>
          <Typography
            variant="button"
            className={classes.currentTime}
          >
            {currentTimeFormatted}
          </Typography>
          <Typography
            variant="button"
            color="secondary"
            className={classes.currentTime}
          >
            {
              ` (${targetTimeFormatted})`
            }
          </Typography>
        </div>
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
