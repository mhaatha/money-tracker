import winston from 'winston';
import config from '../config/config';

export const logger = winston.createLogger({
  level: config.log_level || 'info',
  format: winston.format.combine(
    config.log_level === 'debug'
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [new winston.transports.Console()]
});
