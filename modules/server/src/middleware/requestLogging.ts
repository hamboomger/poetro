import { RequestHandler } from 'express';
import { requestsLogger } from '../lib/loggers';

const logRequestMiddleware: RequestHandler = (req, res, next) => {
  requestsLogger.logRequest(req);
  next();
};

export default logRequestMiddleware;
