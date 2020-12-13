import { Schema } from 'express-validator';

const userAuthValidationSchema: Schema = {
  email: {
    in: ['body'],
    exists: { errorMessage: 'email field is missing' },
    isString: { errorMessage: 'email field should be a string' },
  },
  password: {
    in: ['body'],
    exists: { errorMessage: 'password field is missing' },
    isString: { errorMessage: 'password field should be a string' },
  },
};

export default userAuthValidationSchema;
