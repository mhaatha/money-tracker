import { logger } from '../src/utils/logger';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query'
    },
    {
      emit: 'event',
      level: 'info'
    },
    {
      emit: 'event',
      level: 'warn'
    },
    {
      emit: 'event',
      level: 'error'
    }
  ]
});

prisma.$on('query', (e) => {
  logger.info(`Query: ${e.query}`);
});

prisma.$on('info', (e) => {
  logger.info(`Info: ${e.message}`);
});

prisma.$on('warn', (e) => {
  logger.warn(`Warning: ${e.message}`);
});

prisma.$on('error', (e) => {
  logger.error(`Error: ${e.message}`);
});
