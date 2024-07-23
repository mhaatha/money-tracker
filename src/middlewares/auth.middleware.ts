import { Payload } from '../models/token.model';
import { UserRequest } from '../types/user.type';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../services/token.service';
import { ResponseError } from '../utils/response-error';
import { Response, NextFunction } from 'express';

export const auth = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new ResponseError(
        StatusCodes.UNAUTHORIZED,
        'Authorization header is missing',
        {
          path: 'header'
        }
      );
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, 'Token is missing', {
        path: 'token'
      });
    }

    const decodedPayload: Payload = await verifyToken(token);
    req.user = decodedPayload;
    next();
  } catch (error) {
    next(error);
  }
};
