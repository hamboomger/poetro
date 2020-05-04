import { Result, ValidationError } from 'express-validator';
import CustomRequestError from './customRequestError';

class BadRequestError extends CustomRequestError {
  constructor(message: string, errors?: string[]) {
    super(message, 'Bad Request', 400, errors);
  }

  static from(error: Result<ValidationError>): BadRequestError {
    const errors = error.array();
    if (errors.length === 1) {
      return new BadRequestError(errors[0].msg);
    }
    return new BadRequestError('Multiple validation errors', errors.map((err) => err.msg));
  }
}

export default BadRequestError;
