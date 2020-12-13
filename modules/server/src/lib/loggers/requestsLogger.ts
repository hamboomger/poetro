import _ from 'lodash';
import winston from 'winston';
import { Request } from 'express';
import CustomRequestError from '../errors/CustomRequestError';
import { _winstonDefaultTransports as transports, _winstonLogsFormat as logsFormat } from './common';

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    transports.consoleDefault,
    transports.combinedFile,
    new winston.transports.File({
      filename: 'logs/requests.log',
    }),
  ],
  format: logsFormat,
});

export const requestsLogger = {
  logRequest: (req: Request) => {
    const token = req.params.authorization || req.cookies.authorization || 'none';
    logger.debug(`Request log \t| url: ${req.originalUrl} | token: ${token}`);
  },
  logAuthenticationTry: (email: string) => {
    logger.debug(`User login \t| email: ${email} | pending`);
  },
  logAuthenticationSuccess: (email: string, success: boolean) => {
    logger.debug(`User login \t| email: ${email} | success: ${success}`);
  },
  logRequestError: (error: CustomRequestError) => {
    const { name, errorCode, errors } = error;
    let message = `${error.isServerError() ? '5xx' : '4xx'} error: \t| ${errorCode} ${name}`;
    if (errors?.length) {
      message += ` | errors: \n${JSON.stringify(errors, null, 2)}`;
    }
    if (error.isServerError()) {
      logger.warn(message);
    } else {
      logger.info(message);
    }
  },
};
