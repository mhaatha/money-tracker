import { Payload } from '../models/token.model';
import { StatusCodes } from 'http-status-codes';
import { UserRequest } from '../types/user.type';
import { Response, NextFunction } from 'express';
import {
  GetUserBalanceResponse,
  GetUserResponse,
  UpdateBodyRequest,
  UpdateBodyResponse
} from '../models/user.model';
import {
  deleted,
  getCurrentUser,
  getCurrentUserBalance,
  updateUser
} from '../services/user.service';

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
    const dataUser: Payload = req.user as Payload;
    const dataBody: UpdateBodyRequest = req.body;
    const response: UpdateBodyResponse = await updateUser(dataBody, dataUser.sub);

    res.status(StatusCodes.OK).json({
      data: response
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const data: Payload = req.user as Payload;
    await deleted(data.sub);
    res.status(StatusCodes.OK).json({
      data: null
    });
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
