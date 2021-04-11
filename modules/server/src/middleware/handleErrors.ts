import {
  ErrorRequestHandler, NextFunction, Request, Response,
} from 'express';
import { Error } from 'mongoose';
import { ValidationError } from 'express-validation';
import CustomRequestError from '../lib/errors/CustomRequestError';
import BadRequestError from '../lib/errors/BadRequestError';
import { logger, requestsLogger } from '../lib/loggers';

export function logUnhandledErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(err);
  next(err);
}

function convertCustomErrorToJson(error: CustomRequestError) {
  const json: any = {
    success: false,
    error: error.name,
    message: error.message,
  };
  if (error.errors) {
    json.errors = error.errors;
  }
  return json;
}

export function customRequestErrorsHandler(
  err: Error, req: Request, res: Response, next: NextFunction,
) {
  if (err instanceof CustomRequestError) {
    if (process.env.NODE_ENV !== 'test' || err.errorCode >= 500) {
      // log every error except for the client errors in test environment
      requestsLogger.logRequestError(err);
    }

    res.status(err.errorCode);
    res.json(convertCustomErrorToJson(err));
  } else {
    next(err);
  }
}

export const handleValidationErrors: ErrorRequestHandler = async (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const jsonRes = {
      name: 'ValidationError',
      message: 'Validation error',
      code: err.statusCode,
      validationErrors: err.details,
    };
    res.status(400);
    res.json(jsonRes);
  } else {
    next(err);
  }
};

export function invalidObjectIdErrorHandler(
  err: Error, req: Request, res: Response, next: NextFunction,
) {
  if (err instanceof Error.CastError && err.message.startsWith('Cast to ObjectId failed')) {
    throw new BadRequestError('Invalid object identifier specified');
  } else {
    next(err);
  }
}
