import { NextFunction, Request, Response } from 'express';
import CustomError from './errors/customError';

export function logUnhandledErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  next(err);
}

export function customErrorsHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof CustomError) {
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
