import React from 'react';
import { Collapse, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  status: string;
  errorMsg?: string;
  successMsg?: string;
}

const useStyles = makeStyles({
  feedbackPanel: {
    paddingBottom: '0 !important',
  },
});

const FeedbackPanel: React.FC<Props> = ({ status, errorMsg, successMsg }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.feedbackPanel}>
      <Collapse in={status === 'success'}>
        <Alert severity="success">
          {successMsg || 'Success!'}
        </Alert>
      </Collapse>
      <Collapse in={status === 'error'}>
        <Alert severity="error">
          {errorMsg || 'Error happened'}
        </Alert>
      </Collapse>
    </Grid>
  );
};

export default FeedbackPanel;
