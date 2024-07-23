import { StatusCodes } from 'http-status-codes';
import { Payload } from '../models/token.model';
import { GetUserBalanceResponse, GetUserResponse } from '../models/user.model';
import { getCurrentUser, getCurrentUserBalance } from '../services/user.service';
import { UserRequest } from '../types/user.type';
import { Response, NextFunction } from 'express';

export const get = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const data: Payload = req.user as Payload;
    const response: GetUserResponse = await getCurrentUser(data.sub);

    res.status(StatusCodes.OK).json({
      data: response
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    res.send('GET');
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    res.send('GET');
  } catch (error) {
    next(error);
  }
};

export const getUserBalance = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: Payload = req.user as Payload;
    const response: GetUserBalanceResponse = await getCurrentUserBalance(data.sub);

    res.status(StatusCodes.OK).json({
      data: response
    });
  } catch (error) {
    next(error);
  }
};
