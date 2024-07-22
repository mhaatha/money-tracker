import * as service from '../services/auth.service';
import {
  RequestLogin,
  RequestRegister,
  ResponseLogin,
  ResponseRegister
} from '../models/auth.model';
import { StatusCodes } from 'http-status-codes';
import { generateAuthToken } from '../services/token.service';
import { Request, Response, NextFunction } from 'express';
import { TokenResponse } from '../models/token.model';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: RequestRegister = req.body;
    const response: ResponseRegister = await service.create(data);

    res.status(StatusCodes.CREATED).json({
      data: response
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: RequestLogin = req.body;
    const response: ResponseLogin = await service.login(data);
    const tokens: TokenResponse = await generateAuthToken(response.id);

    res.status(StatusCodes.OK).json({
      data: response,
      tokens
    });
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
