import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { prisma } from '../../prisma';
import { validate } from '../validations/validation';
import { StatusCodes } from 'http-status-codes';
import { ResponseError } from '../utils/response-error';
import { userBodyRequest } from '../validations/user.validation';
import {
  ResponseGetUser,
  toResponseGetUser,
  ResponseGetUserBalance,
  toResponseGetUserBalance,
  RequestUpdate,
  ResponseUpdate,
  toResponseUpdate
} from '../models/user.model';

export const getUserById = async (userId: string) => {
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

  return user;
};

export const getCurrentUser = async (userId: string): Promise<ResponseGetUser> => {
  const user: User | null = await getUserById(userId);

  return toResponseGetUser(user);
};

export const getCurrentUserBalance = async (
  userId: string
): Promise<ResponseGetUserBalance> => {
  const user: User | null = await getUserById(userId);

  return toResponseGetUserBalance(user);
};

export const updateUser = async (
  data: RequestUpdate,
  userId: string
): Promise<ResponseUpdate> => {
  const updateBody: RequestUpdate = validate(userBodyRequest, data);

  // VALIDATION: REQUEST BODY CANNOT EMPTY
  if (Object.keys(updateBody).length === 0) {
    throw new ResponseError(StatusCodes.BAD_REQUEST, 'Request body cannot empty', {
      path: 'data'
    });
  }

  // VALIDATION: IS USER EXISTS
  const user: User | null = await getUserById(userId);

  // BCRYPT PASSWORD
  if (updateBody.password) {
    updateBody.password = await bcrypt.hash(updateBody.password, 10);
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

  return toResponseUpdate(updateUser);
};

export const deleted = async (userId: string): Promise<void> => {
  // VALIDATION: IS USER EXISTS
  const user: User | null = await getUserById(userId);

  // DELETE USER
  await prisma.user.delete({
    where: {
      id: user.id
    }
  });
};
