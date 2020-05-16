import {
  Button, Collapse, Grid, Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import ComponentProps from '../../../../models/ComponentProps';
import connectStore from '../../../connectStore';
import InputField from '../../fields/InputField';
import TextAreaField from '../../fields/TextAreaField';

const useStyles = makeStyles({
  feedbackPanel: {
    paddingBottom: '0 !important',
  },
  fieldLabel: {
    padding: '20px 0',
    textAlign: 'right',
  },
  submitBtn: {
    margin: '10px auto',
    display: 'block',
  },
});

const validationSchema = Yup.object().shape({
  author: Yup.string().required(),
  name: Yup.string(),
  text: Yup.string().required(),
  targetTimeSec: Yup.number().required(),
});

async function onSubmit(values: any, actions: FormikHelpers<any>): Promise<boolean> {
  try {
    await axios.post('/api/poem', values);
    actions.setSubmitting(false);
    actions.setStatus('success');
    return true;
  } catch (e) {
    console.log('Error occured on form submit: ', e);
    actions.setStatus('error');
    return false;
  }
}

const CreatePoemForm: React.FC<ComponentProps> = () => {
  const classes = useStyles();
  const initialValues = {
    author: '',
    text: '',
    name: '',
    targetTimeSec: undefined,
  };
  const history = useHistory();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: any, actions: FormikHelpers<any>) => {
        const submittedSuccessfully = await onSubmit(values, actions);
        if (submittedSuccessfully) {
          setTimeout(() => history.push('/'), 1000);
        }
      }}
      validationSchema={validationSchema}
      render={({ status }) => (
        <Form autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.feedbackPanel}>
              <Collapse in={status === 'success'}>
                <Alert severity="success">Poem created!</Alert>
              </Collapse>
              <Collapse in={status === 'error'}>
                <Alert severity="error">An error occurred while submitting a form :(</Alert>
              </Collapse>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.fieldLabel}>
                Author:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <InputField
                required
                fullWidth
                name="author"
              />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.fieldLabel}>
                Name:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <InputField fullWidth name="name" />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.fieldLabel}>
                Text:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextAreaField
                required
                fullWidth
                rows={10}
                name="text"
              />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.fieldLabel}>
                Target time (seconds):
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <InputField
                required
                fullWidth
                type="number"
                name="targetTimeSec"
              />
            </Grid>
            <Grid item xs={12}>
              <Button className={classes.submitBtn} type="submit" variant="outlined" color="secondary">
                Create
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    />
  );
};

export default connectStore(CreatePoemForm);
