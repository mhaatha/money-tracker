import config from './config/config';
import { app } from './app';
import { prisma } from '../prisma';
import { logger } from './utils/logger';
import { Server, IncomingMessage, ServerResponse } from 'http';

let server: Server<typeof IncomingMessage, typeof ServerResponse> | undefined;
const port: number = config.port;

if (prisma) {
  logger.info('Connected to Database');
  server = app.listen(port, () => {
    logger.info(`Server listening on http://localhost:${port}`);
  });
}

const exitHandler = (): void => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error): void => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', (reason) => {
  if (reason instanceof Error) {
    unexpectedErrorHandler(reason);
  } else {
    logger.error(`Unhandled rejection: ${reason}`);
    exitHandler();
  }
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close(() => {
      logger.info('Server closed on SIGTERM');
      process.exit(0);
    });
  }
});
