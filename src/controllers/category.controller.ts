import { StatusCodes } from 'http-status-codes';
import { UserRequest } from '../types/user.type';
import { Response, NextFunction } from 'express';
import { RequestBody, ResponseBody } from '../models/category.model';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory
} from '../services/category.service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const data: RequestBody = req.body;
    const response: ResponseBody = await createCategory(data);

    res.status(StatusCodes.CREATED).json({
      data: response
    });
  } catch (error) {
    next(error);
  }
};

export const get = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const data = req.query;
    const response: ResponseBody[] = await getCategories(data.name as string);

    res.status(StatusCodes.OK).json({
      data: response
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const data = req.params;
    const response: ResponseBody = await getCategoryById(data.categoryId);

    res.status(StatusCodes.OK).json({
      data: response
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const data: RequestBody = req.body;
    const categoryId: string = req.params.categoryId;
    const response: ResponseBody = await updateCategory(data, categoryId);

    res.status(StatusCodes.OK).json({
      data: response
    });
  } catch (error) {
    next(error);
  }
};

export const deleted = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const categoryId: string = req.params.categoryId;
    await deleteCategory(categoryId);

    res.status(StatusCodes.OK).json({
      data: null
    });
  } catch (error) {
    next(error);
  }
};
