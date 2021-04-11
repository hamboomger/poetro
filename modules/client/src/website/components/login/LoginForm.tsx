import {
  Button, Divider, Grid, Typography,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useCookies } from 'react-cookie';
import ComponentProps from '../../../models/ComponentProps';
import FeedbackPanel from '../common/FeedbackPanel';
import InputField from '../fields/InputField';
import connectStore from '../../connectStore';
import appConstants from '../../lib/appConstants';
import GoogleButton from './google/GoogleButton';
import DividerWithText from '../common/DividerWithText';

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
  googleBtn: {

  },
});

const validationSchema = Yup.object().shape({
  email: Yup
    .string()
    .email()
    .required(),
  password: Yup.string().required(),
});

const initialValues = {
  email: '',
  password: '',
};

async function onSubmit(credentials: any, actions: FormikHelpers<any>): Promise<string | null> {
  try {
    const response = await axios.post('/api/login-local', credentials);
    console.log(response);
    actions.setSubmitting(false);
    actions.setStatus('success');
    return response.data.authentication;
  } catch (e) {
    console.log('Error occured on form submit: ', e);
    actions.setStatus('error');
    return null;
  }
}

const LoginForm: React.FC<ComponentProps> = ({ actions: { allTags } }) => {
  const classes = useStyles();
  const [, setCookie] = useCookies([appConstants.JWT_TOKEN_NAME]);
  const history = useHistory();
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values: any, actions: FormikHelpers<any>) => {
        const authToken = await onSubmit(values, actions);
        if (authToken) {
          setCookie(appConstants.JWT_TOKEN_NAME, authToken);
          allTags.loadAllTags();
          setTimeout(() => history.push('/'), 1000);
        }
      }}
      validationSchema={validationSchema}
      render={({ status }) => (
        <Form autoComplete="off">
          <Grid container spacing={2}>
            <FeedbackPanel status={status} errorMsg="Login failed" successMsg="Login succeeded" />
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
                Log in
              </Button>
              <Button
                color="primary"
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12}>
              <DividerWithText textToDisplay="or" />
            </Grid>
            <Grid item xs={12} className={classes.buttonGroup}>
              <GoogleButton />
            </Grid>
          </Grid>
        </Form>
      )}
    />
  );
};

export default connectStore(LoginForm);
