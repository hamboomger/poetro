import { format } from 'logform';
import winston from 'winston';

export const _winstonLogsFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.errors({ stack: true }),
  format.printf((info) => `${info.timestamp} ${(`${info.level}:`).padEnd(7)}${info.message}`),
);

export const _winstonDefaultTransports = {
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
