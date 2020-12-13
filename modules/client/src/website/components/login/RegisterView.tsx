import React from 'react';
import { Card, CardContent, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Background from './background.png';
import RegisterForm from './RegisterForm';

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
  registerCard: {
    marginTop: 100,
    paddingTop: 25,
  },
});

interface Props {
}

const RegisterView: React.FC<Props> = () => {
  const classes = useStyles();
  return (
    <div className={classes.background}>
      <Container maxWidth="sm">
        <Card className={classes.registerCard}>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterView;
