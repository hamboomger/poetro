import React from 'react';
import { Collapse, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  status: string;
  isEdit: boolean;
}

const useStyles = makeStyles({
  feedbackPanel: {
    paddingBottom: '0 !important',
  },
});

const CreatePoemFeedbackPanel: React.FC<Props> = ({ status, isEdit }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.feedbackPanel}>
      <Collapse in={status === 'success'}>
        <Alert severity="success">
          {`Poem ${isEdit ? 'saved' : 'created'}!`}
        </Alert>
      </Collapse>
      <Collapse in={status === 'error'}>
        <Alert severity="error">An error occurred while submitting a form :(</Alert>
      </Collapse>
    </Grid>
  );
};

export default CreatePoemFeedbackPanel;
