import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import { ResponseError } from '../utils/response-error';

const handlerPrismaError = (err: PrismaClientKnownRequestError) => {
  let meta = {};

  switch (err.code) {
    case 'P2002':
      // Handling duplicate key errors
      meta = err.meta || {};
      return new ResponseError(StatusCodes.BAD_REQUEST, 'Duplicate Key', meta);
    case 'P2014':
      // Handling invalid id errors
      meta = err.meta || {};
      return new ResponseError(StatusCodes.BAD_REQUEST, 'Invalid Id', meta);
    case 'P2003':
      // Handling invalid data errors
      meta = err.meta || {};
      return new ResponseError(StatusCodes.BAD_REQUEST, `Invalid Data ${err}`, meta);
    default:
      return new ResponseError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        meta
      );
  }
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message
    }));

    res.status(StatusCodes.BAD_REQUEST).json({
      errors
    });
  }
  if (err instanceof PrismaClientKnownRequestError) {
    const errors = handlerPrismaError(err);
    const path = errors.error.target.split('_')[1];

    res.status(StatusCodes.BAD_REQUEST).json({
      errors: [
        {
          path,
          message: errors.message
        }
      ]
    });
  }
  next();
};