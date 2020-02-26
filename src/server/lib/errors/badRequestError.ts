import CustomError from './customError';

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 'Bad Request', 400);
  }
}

export default BadRequestError;
