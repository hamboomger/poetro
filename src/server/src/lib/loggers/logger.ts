import winston from 'winston';
import { _winstonDefaultTransports as transports, _winstonLogsFormat as logsFormat } from './common';

export const logger = winston.createLogger({
  level: 'debug',
  transports: [
    transports.consoleDefault,
    transports.combinedFile,
    transports.errors,
  ],
  format: logsFormat,
});
