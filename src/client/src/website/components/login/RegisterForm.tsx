import { Button, Grid, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import ComponentProps from '../../../models/ComponentProps';
import FeedbackPanel from '../common/FeedbackPanel';
import InputField from '../fields/InputField';
import connectStore from '../../connectStore';

const useStyles = makeStyles({
  fieldLabel: {
    padding: '20px 0',
    textAlign: 'right',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
  },
  submitBtn: {
    marginRight: 10,
  },
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup
    .string()
    .email()
    .required(),
  password: Yup.string().required(),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
};

async function onSubmit(credentials: any, actions: FormikHelpers<any>): Promise<string | null> {
  try {
    const response = await axios.post('/api/register-local', credentials);
    console.log(response);
    actions.setSubmitting(false);
    actions.setStatus('success');
    return null;
  } catch (e) {
    console.log('Error occurred on form submit: ', e);
    actions.setStatus('error');
    return e.message;
  }
}

const RegisterForm: React.FC<ComponentProps> = () => {
  const history = useHistory();
  const classes = useStyles();
  const [feedbackPanelMessage, setFeedbackPanelMessage] = useState<string>();

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values: any, actions: FormikHelpers<any>) => {
        const errorMessage = await onSubmit(values, actions);
        if (!errorMessage) {
          setTimeout(() => history.push('/'), 1000);
        } else {
          setFeedbackPanelMessage(errorMessage);
        }
      }}
      validationSchema={validationSchema}
      render={({ status }) => (
        <Form autoComplete="off">
          <Grid container spacing={2}>
            <FeedbackPanel status={status} errorMsg={feedbackPanelMessage} />
            <Grid item xs={3}>
              <Typography className={classes.fieldLabel}>
                Name:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <InputField
                required
                fullWidth
                name="name"
              />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.fieldLabel}>
                Email:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <InputField
                required
                fullWidth
                name="email"
              />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.fieldLabel}>
                Password:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <InputField type="password" required fullWidth name="password" />
            </Grid>
            <Grid item xs={12} className={classes.buttonGroup}>
              <Button
                className={classes.submitBtn}
                type="submit"
                variant="outlined"
                color="secondary"
              >
                Register
              </Button>
              <Button
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    />
  );
};

export default connectStore(RegisterForm);
