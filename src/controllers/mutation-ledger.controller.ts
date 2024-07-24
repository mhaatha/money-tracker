import { Payload } from '../models/token.model';
import { UserRequest } from '../types/user.type';
import { StatusCodes } from 'http-status-codes';
import { ResponseBody } from '../models/mutationLedger.model';
import { NextFunction, Response } from 'express';
import { RequestBody, UpdateRequestBody } from '../models/mutationLedger.model';
import {
  createMutationLedger,
  deleteMutation,
  getMutations,
  updateMutations
} from '../services/mutation-ledger.service';

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
    const dataUser: Payload = req.user as Payload;
    const response: ResponseBody[] = await getMutations(dataUser.sub);

    res.status(StatusCodes.OK).json({
      data: response
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const data: UpdateRequestBody = req.body;
    const mutationId: string = req.params.mutationId;
    const response: ResponseBody = await updateMutations(data, mutationId);

    res.status(StatusCodes.OK).json({
      data: response
    });
  } catch (error) {
    next(error);
  }
};

export const deleted = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const mutationId: string = req.params.mutationId;
    await deleteMutation(mutationId);

    res.status(StatusCodes.OK).json({
      data: null
    });
  } catch (error) {
    next(error);
  }
};
