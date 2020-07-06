import CustomRequestError from './CustomRequestError';

class UnauthorizedRequestError extends CustomRequestError {
  constructor(message: string) {
    super(message, 'Unauthorized', 401);
  }
}

export default UnauthorizedRequestError;
