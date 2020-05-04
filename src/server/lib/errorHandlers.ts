import { NextFunction, Request, Response } from 'express';
import CustomRequestError from './errors/customRequestError';

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

export function customErrorsHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof CustomRequestError) {
    console.info('Custom error occurred:', err);
    res.status(err.errorCode);
    res.json(convertCustomErrorToJson(err));
  } else {
    next(err);
  }
}
