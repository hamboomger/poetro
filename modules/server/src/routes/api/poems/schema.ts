import { Schema } from 'express-validator';
import isStringArray from '../validation/custom/isStringArray';

export const createPoemValidationSchema: Schema = {
  author: {
    exists: { errorMessage: 'subheader field is missing' },
    isString: { errorMessage: 'subheader field should be a string' },
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
  tags: {
    optional: true,
    custom: {
      options: isStringArray,
    },
  },
};

export const editPoemValidationSchema: Schema = {
  author: {
    optional: true,
    isString: { errorMessage: 'subheader field should be a string' },
  },
  text: {
    optional: true,
    isString: { errorMessage: 'text field should be a string' },
  },
  targetTimeSec: {
    optional: true,
    isNumeric: { errorMessage: 'targetTimeSec field should be a number' },
  },
  name: {
    optional: true,
    isString: { errorMessage: 'name field should be a string' },
  },
};
