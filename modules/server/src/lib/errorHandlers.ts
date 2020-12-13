import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import CustomRequestError from './errors/CustomRequestError';
import BadRequestError from './errors/BadRequestError';
import { logger, requestsLogger } from './loggers';

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

export function invalidObjectIdErrorHandler(
  err: Error, req: Request, res: Response, next: NextFunction,
) {
  if (err instanceof Error.CastError && err.message.startsWith('Cast to ObjectId failed')) {
    throw new BadRequestError('Invalid object identifier specified');
  } else {
    next(err);
  }
}
