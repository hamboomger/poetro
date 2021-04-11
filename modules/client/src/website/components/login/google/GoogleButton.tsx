import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
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
      component={Link}
      to="/api/google"
      className={classes.googleBtn}
      // size="large"
      startIcon={<GoogleIcon />}
    >
      Sign in using Google
    </Button>
  );
};

export default GoogleButton;
