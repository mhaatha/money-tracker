import { Payload } from '../models/token.model';
import { StatusCodes } from 'http-status-codes';
import { UserRequest } from '../types/user.type';
import { Response, NextFunction } from 'express';
import {
  deleted,
  getCurrentUser,
  getCurrentUserBalance,
  updateUser
} from '../services/user.service';
import {
  ResponseGetUserBalance,
  ResponseGetUser,
  RequestUpdate,
  ResponseUpdate
} from '../models/user.model';

export const get = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const data: Payload = req.user as Payload;
    const response: ResponseGetUser = await getCurrentUser(data.sub);

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
    const dataBody: RequestUpdate = req.body;
    const response: ResponseUpdate = await updateUser(dataBody, dataUser.sub);

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
    const response: ResponseGetUserBalance = await getCurrentUserBalance(data.sub);

    res.status(StatusCodes.OK).json({
      data: response
    });
  } catch (error) {
    next(error);
  }
};
