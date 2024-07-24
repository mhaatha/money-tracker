import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import compression from 'compression';
import { router } from './routes';
import { StatusCodes } from 'http-status-codes';
import { errorHandler } from './middlewares/error.middleware';
import { ResponseError } from './utils/response-error';

export const app = express();

// HTTP Header Security
app.use(helmet());

// Middleware Parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gzip compression
app.use(compression());

// CORS
app.use(cors());
app.options('*', cors());

// Main API
app.use('/api/v1', router);

// 404 Handler
app.use((req, res, next) => {
  next(
    new ResponseError(StatusCodes.NOT_FOUND, 'Endpoint is not found', { path: req.path })
  );
});

// Error Handler
app.use(errorHandler);
