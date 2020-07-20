import React from 'react';
import {
  Card, CardContent, Container, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from './LoginForm';
import Background from './background.png';
import { buildForm, FormFields, OnFormSubmit } from '../../../util/buildForm';

const useStyles = makeStyles({
  background: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'repeat',
  },
  loginCard: {
    marginTop: 100,
    paddingTop: 25,
  },
});

interface Props {
}

interface FormFields {
  email: string;
  password: string;
}

const LoginView: React.FC<Props> = () => {
  const classes = useStyles();
  const loginForm = buildForm<FormFields>({
    email: { type: 'email' },
    password: { type: 'password' },
  }, (values) => {
    return { success: true, message: values.email };
  });

  return (
    <div className={classes.background}>
      <Container maxWidth="sm">
        <Card className={classes.loginCard}>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default LoginView;
