import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Divider, Paper, Switch, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import connectStore from '../../connectStore';
import ComponentProps from '../../../models/ComponentProps';
import RootActionCreator from '../../../actions/interfaces/RootActionCreator';

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
  options: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const leftButtonLabel = {

};

type TimerState = 'stopped' | 'paused' | 'working';

interface Props extends ComponentProps {
  targetTimeSec: number;
}

function hidePoemTextIfNecessary(
  hideOnStartOptionEnabled: boolean,
  timerState: TimerState,
  actions: RootActionCreator,
) {
  const { setHidePoemText } = actions.chosenPoem;

  if (hideOnStartOptionEnabled) {
    if (timerState === 'working') {
      setHidePoemText(true);
    } else {
      setHidePoemText(false);
    }
  } else {
    setHidePoemText(false);
  }
}

const Stopwatch: React.FC<Props> = ({ targetTimeSec, actions }) => {
  const classes = useStyles();
  const [counter, setCounter] = useState(0);
  const [timerState, setTimerState] = useState<TimerState>('stopped');
  const [hideOnStartOptionEnabled, setHideOnStartOption] = useState(false);

  const lastTimeoutId = useRef<any>();
  useEffect(() => {
    if (timerState === 'working') {
      lastTimeoutId.current = setTimeout(() => setCounter(counter + 1000), 1000);
    } else {
      clearTimeout(lastTimeoutId.current);
    }
  }, [counter, timerState]);

  hidePoemTextIfNecessary(hideOnStartOptionEnabled, timerState, actions);

  const currentTimeFormatted = moment.utc(counter).format('mm:ss');
  const targetTimeFormatted = moment.utc(targetTimeSec * 1000).format('mm:ss');

  return (
    <Paper variant="outlined" className={classes.root}>
      <div className={classes.content}>
        <Button
          onClick={() => setTimerState(timerState !== 'working' ? 'working' : 'paused')}
          color="primary"
        >
          { { working: 'Pause', paused: 'Continue', stopped: 'Start' }[timerState] }
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
            setTimerState('stopped');
          }}
        >
          Reset
        </Button>
      </div>
      <Divider />
      <div className={classes.options}>
        <Switch
          checked={hideOnStartOptionEnabled}
          onChange={(event, checked) => setHideOnStartOption(checked)}
          name="checkedA"
        />
        <Typography variant="button">Hide text on start</Typography>
      </div>
    </Paper>
  );
};

export default connectStore(Stopwatch);
