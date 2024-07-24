import { NextFunction, Response } from 'express';
import { UserRequest } from '../types/user.type';
import { RequestBody } from '../models/mutationLedger.model';
import { ResponseBody } from '../models/mutationLedger.model';
import { createMutationLedger } from '../services/mutation-ledger.service';
import { StatusCodes } from 'http-status-codes';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const data: RequestBody = req.body;
    const response: ResponseBody = await createMutationLedger(data);

    res.status(StatusCodes.CREATED).json({
      data: response
    });
  } catch (error) {
    next(error);
  }
};

export const get = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    res.send('adsad');
  } catch (error) {
    next(error);
  }
};

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    res.send('adsad');
  } catch (error) {
    next(error);
  }
};

export const deleted = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    res.send('adsad');
  } catch (error) {
    next(error);
  }
};
