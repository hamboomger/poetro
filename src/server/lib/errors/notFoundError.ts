import CustomRequestError from './customRequestError';

class NotFoundError extends CustomRequestError {
  constructor(message: string) {
    super(message, 'Resource not found', 404);
  }
}

export default NotFoundError;
