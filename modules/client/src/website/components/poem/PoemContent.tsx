import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  text: {
    textAlign: 'left',
    whiteSpace: 'pre-line',
  },
});

const PoemContent: React.FC<{ text: string }> = ({ text }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.text} component="p">
      {text}
    </Typography>
  );
};

export default PoemContent;
