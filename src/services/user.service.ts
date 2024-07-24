import { User } from '@prisma/client';
import { prisma } from '../../prisma';
import { StatusCodes } from 'http-status-codes';
import { ResponseError } from '../utils/response-error';
import {
  GetUserResponse,
  toGetUserResponse,
  GetUserBalanceResponse,
  toGetUserBalanceResponse,
  UpdateBodyRequest,
  UpdateBodyResponse,
  toUpdateUserResponse
} from '../models/user.model';
import { validate } from '../validations/validation';
import { userBodyRequest } from '../validations/user.validation';

export const getCurrentUser = async (userId: string): Promise<GetUserResponse> => {
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!user) {
    throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found', {
      path: 'user_id'
    });
  }

  return toGetUserResponse(user);
};

export const getCurrentUserBalance = async (
  userId: string
): Promise<GetUserBalanceResponse> => {
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!user) {
    throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found', {
      path: 'user_id'
    });
  }

  return toGetUserBalanceResponse(user);
};

export const updateUser = async (
  data: UpdateBodyRequest,
  userId: string
): Promise<UpdateBodyResponse> => {
  const updateBody: UpdateBodyRequest = validate(userBodyRequest, data);

  // VALIDATION: REQUEST BODY CANNOT EMPTY
  if (Object.keys(updateBody).length === 0) {
    throw new ResponseError(StatusCodes.BAD_REQUEST, 'Request body cannot empty', {
      path: 'data'
    });
  }

  // VALIDATION: IS USER EXISTS
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!user) {
    throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found', {
      path: 'user_id'
    });
  }

  // UPDATE USER
  const updateUser: User = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      username: updateBody.username || user.username,
      email: updateBody.email || user.email,
      password: updateBody.password || user.password,
      first_name: updateBody.first_name || user.first_name,
      last_name: updateBody.last_name || user.last_name
    }
  });

  return toUpdateUserResponse(updateUser);
};

export const deleted = async (userId: string): Promise<void> => {
  // VALIDATION: IS USER EXISTS
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!user) {
    throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found', {
      path: 'user_id'
    });
  }

  // DELETE USER
  await prisma.user.delete({
    where: {
      id: userId
    }
  });
};
