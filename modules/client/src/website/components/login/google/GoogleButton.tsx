import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as GoogleIcon } from './google.svg';

const useStyles = makeStyles({
  googleBtn: {
    // height: 25,
  },
});

const GoogleButton: React.FC = () => {
  const classes = useStyles();

  return (
    <Button
      variant="outlined"
      href="/api/google"
      className={classes.googleBtn}
      startIcon={<GoogleIcon />}
    >
      Sign in using Google
    </Button>
  );
};

export default GoogleButton;
