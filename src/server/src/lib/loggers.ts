import winston from 'winston';
import { format } from 'logform';

const logsFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const transports = {
  consoleDefault: new winston.transports.Console({
    level: 'info',
  }),
  combinedFile: new winston.transports.File({
    filename: 'logs/combined.log',
    level: 'info',
  }),
  errors: new winston.transports.File({
    filename: 'logs/errors.log',
    level: 'error',
  }),
};

export const logger = winston.createLogger({
  level: 'debug',
  transports: [
    transports.consoleDefault,
    transports.combinedFile,
    transports.errors,
  ],
  format: logsFormat,
});

export const requestsLogger = winston.createLogger({
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
