import CustomError from './customError';

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 'Resource not found', 404);
  }
}

export default NotFoundError;
