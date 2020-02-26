import { NextFunction, Request, Response } from 'express';
import { isCustomError } from './errors/customError';

export function logErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  next(err);
}

export function customErrorsHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (isCustomError(err)) {
    res.status(err.errorCode);
    res.json({
      success: false,
      error: err.name,
      message: err.message,
    });
  } else {
    next(err);
  }
}
