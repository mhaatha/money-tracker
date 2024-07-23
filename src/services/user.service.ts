import { User } from '@prisma/client';
import { prisma } from '../../prisma';
import { StatusCodes } from 'http-status-codes';
import { ResponseError } from '../utils/response-error';
import {
  GetUserResponse,
  toGetUserResponse,
  GetUserBalanceResponse,
  toGetUserBalanceResponse
} from '../models/user.model';

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
