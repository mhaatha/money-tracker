import { prisma } from '../../prisma';
import { validate } from '../validations/validation';
import { StatusCodes } from 'http-status-codes';
import { ResponseError } from '../utils/response-error';
import { categoryBodyRequest } from '../validations/category.validation';
import { RequestBody, ResponseBody } from '../models/category.model';

export const getCategoryById = async (categoryId: string) => {
  const category: ResponseBody | null = await prisma.category.findUnique({
    where: {
      id: categoryId
    }
  });

  if (!category) {
    throw new ResponseError(StatusCodes.NOT_FOUND, 'Category not found', {
      path: 'category_id'
    });
  }

  return category;
};

export const createCategory = async (data: RequestBody): Promise<ResponseBody> => {
  const createData: RequestBody = validate(categoryBodyRequest, data);

  // CREATE CATEGORY
  const category: ResponseBody = await prisma.category.create({
    data: {
      name: createData.name
    }
  });

  return category;
};

export const getCategories = async (
  userId: string,
  name: string
): Promise<ResponseBody[]> => {
  if (name) {
    const categories: ResponseBody[] = await prisma.category.findMany({
      where: {
        name: {
          contains: name
        }
      }
    });

    if (categories.length === 0) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'Category not found', {
        path: 'name'
      });
    }

    return categories;
  } else {
    const categories: ResponseBody[] = await prisma.category.findMany({});

    if (categories.length === 0) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'Category not found', {
        path: 'name'
      });
    }

    return categories;
  }
};

export const updateCategory = async (
  data: RequestBody,
  categoryId: string
): Promise<ResponseBody> => {
  const updateData: RequestBody = validate(categoryBodyRequest, data);

  // VALIDATION: IS CATEGORY EXISTS
  const category: ResponseBody | null = await getCategoryById(categoryId);

  // UPDATE CATEGORY
  const categoryUpdated: ResponseBody = await prisma.category.update({
    where: {
      id: category.id
    },
    data: {
      name: updateData.name
    }
  });

  return categoryUpdated;
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  // VALIDATION: IS CATEGORY EXISTS
  const category: ResponseBody | null = await getCategoryById(categoryId);

  // DELETE CATEGORY
  await prisma.category.delete({
    where: {
      id: category.id
    }
  });
};
