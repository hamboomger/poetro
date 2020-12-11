import React from 'react';
import { Card, CardContent, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from './LoginForm';
import Background from './background.png';

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
