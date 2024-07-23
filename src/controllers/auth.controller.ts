import * as service from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';
import { UserRequest } from '../types/user.type';
import { TokenResponse } from '../models/token.model';
import { Payload, RequestRefreshToken } from '../models/token.model';
import { Request, Response, NextFunction } from 'express';
import { storeToken, refreshJwt, deleteToken } from '../services/token.service';
import {
  RequestLogin,
  RequestRegister,
  ResponseLogin,
  ResponseRegister
} from '../models/auth.model';

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
    const jwt: TokenResponse = await storeToken(response.id);

    res.status(StatusCodes.OK).json({
      data: response,
      tokens: jwt
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const userData = req.user as Payload;
    await deleteToken(userData.sub!);

    res.status(StatusCodes.OK).json({
      data: null
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: RequestRefreshToken = req.body;
    const jwt: TokenResponse = await refreshJwt(data);

    res.status(StatusCodes.OK).json({
      data: jwt
    });
  } catch (error) {
    next(error);
  }
};
