import * as service from '../services/auth.service';
import { RequestBody, ResponseData } from '../models/auth.model';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: RequestBody = req.body;
    const response: ResponseData = await service.create(data);

    res.status(StatusCodes.CREATED).json({
      data: response
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('Login');
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('logout');
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('Refresh Token');
  } catch (error) {
    next(error);
  }
};
