import _ from 'lodash';
import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import CustomRequestError from './errors/CustomRequestError';
import BadRequestError from './errors/BadRequestError';
import {requestsLogger} from './loggers';

export function logUnhandledErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
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

function logRequestError(err: CustomRequestError) {
  if (_.inRange(err.errorCode, 400, 500)) {
    requestsLogger.info('Server responded with 4xx error: ', err);
  } else if (err.errorCode >= 500) {
    requestsLogger.warn('Server responded with 5xx error: ', err);
  }
}
export function customRequestErrorsHandler(
  err: Error, req: Request, res: Response, next: NextFunction,
) {
  if (err instanceof CustomRequestError) {
    if (process.env.NODE_ENV !== 'test') {
      logRequestError(err);
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
