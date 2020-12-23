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
  logAuthenticationTry: (nameOrEmail: string) => {
    logger.debug(`User login \t| login: ${nameOrEmail} | pending`);
  },
  logAuthenticationSuccess: (nameOrEmail: string, success: boolean) => {
    logger.debug(`User login \t| login: ${nameOrEmail} | success: ${success}`);
  },
  logRegistrationTry: (name: string, email: string) => {
    logger.debug(`User sign up \t| name: ${name}, email: ${email} | pending`);
  },
  logRegistrationSuccess: (name: string, email: string, success: boolean) => {
    logger.debug(`User sign up \t| name: ${name}, email: ${email} | success: ${success}`);
  },
  logRequestError: (error: CustomRequestError) => {
    const {
      name, errorCode, errors, message: errorMessage,
    } = error;
    let message = `${error.isServerError() ? '5xx' : '4xx'} error: \t| ${errorCode} ${name}: ${errorMessage}`;
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
