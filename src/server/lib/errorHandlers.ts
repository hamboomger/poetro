import { NextFunction, Request, Response } from 'express';
import CustomError from './errors/customError';

export function logUnhandledErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  next(err);
}

function convertCustomErrorToJson(error: CustomError) {
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
  if (err instanceof CustomError) {
    res.status(err.errorCode);
    res.json(convertCustomErrorToJson(err));
  } else {
    next(err);
  }
}
