import { Schema } from 'express-validator';

const poemValidationSchema: Schema = {
  author: {
    exists: { errorMessage: 'author field is missing' },
    isString: { errorMessage: 'author field should be a string' },
  },
  text: {
    exists: { errorMessage: 'text field is missing' },
    isString: { errorMessage: 'text field should be a string' },
  },
  targetTimeSec: {
    exists: { errorMessage: 'targetTimeSec field is missing' },
    isNumeric: { errorMessage: 'targetTimeSec field should be a number' },
  },
  name: {
    optional: true,
    isString: { errorMessage: 'name field should be a string' },
  },
};

export default poemValidationSchema;
