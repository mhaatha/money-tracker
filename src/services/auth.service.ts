import { User } from '@prisma/client';
import { prisma } from '../../prisma';
import {
  RequestLogin,
  RequestRegister,
  ResponseRegister,
  ResponseLogin,
  toRegisterResponse,
  toLoginResponse
} from '../models/auth.model';
import { loginBodyRequest, registerBodyRequest } from '../validations/auth.validation';
import { validate } from '../validations/validation';
import bcrypt from 'bcrypt';
import { ResponseError } from '../utils/response-error';
import { StatusCodes } from 'http-status-codes';
import { TokenResponse } from '../models/token.model';
import { generateAuthToken } from './token.service';

export const create = async (data: RequestRegister): Promise<ResponseRegister> => {
  const registerBody: RequestRegister = validate(registerBodyRequest, data);

  // BCRYPT PASSWORD
  registerBody.password = await bcrypt.hash(registerBody.password, 10);
  const user: User = await prisma.user.create({
    data: {
      username: registerBody.username,
      email: registerBody.email,
      password: registerBody.password,
      first_name: registerBody.first_name,
      last_name: registerBody.last_name,
      total_balance: 0
    }
  });

  return toRegisterResponse(user);
};

export const login = async (data: RequestLogin): Promise<ResponseLogin> => {
  const loginBody: RequestLogin = validate(loginBodyRequest, data);

  // VALIDASI USERNAME
  const user: User | null = await prisma.user.findUnique({
    where: {
      username: loginBody.username
    }
  });
  if (!user) {
    throw new ResponseError(
      StatusCodes.UNAUTHORIZED,
      'Username or password is incorrect',
      {
        path: 'username'
      }
    );
  }

  // VALIDASI PASSWORD
  const isPasswordValid = await bcrypt.compare(loginBody.password, user.password);
  if (!isPasswordValid) {
    throw new ResponseError(
      StatusCodes.UNAUTHORIZED,
      'Username or password is incorrect',
      {
        path: 'password'
      }
    );
  }

  return toLoginResponse(user);
};

export const storeToken = async (userId: string): Promise<TokenResponse> => {
  const jwt = await generateAuthToken(userId);

  // STORE REFRESH TOKEN TO DATABASE
  await prisma.token.create({
    data: {
      user_id: userId,
      refresh_token: jwt.refresh.token
    }
  });

  return jwt;
};
