import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config/config';
import { Token } from '@prisma/client';
import { prisma } from '../../prisma';
import { StatusCodes } from 'http-status-codes';
import { ResponseError } from '../utils/response-error';
import { TokenResponse } from '../models/token.model';
import { TokenTypes, Payload } from '../models/token.model';

export const generateToken = async (
  userId: string,
  expires: moment.Moment,
  type: string,
  secret = config.jwt.secret!
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  };
  return jwt.sign(payload, secret);
};

export const generateAuthToken = async (userId: string) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = await generateToken(userId, accessTokenExpires, TokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = await generateToken(
    userId,
    refreshTokenExpires,
    TokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expired: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expired: refreshTokenExpires.toDate()
    }
  };
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

export const deleteToken = async (userId: string): Promise<void> => {
  const token: Token | null = await prisma.token.findUnique({
    where: {
      user_id: userId
    }
  });

  if (!token) {
    throw new ResponseError(
      StatusCodes.NOT_FOUND,
      'Refresh token is not found in database',
      {
        path: 'user_id'
      }
    );
  }

  // DELETE REFRESH TOKEN
  await prisma.token.delete({
    where: {
      id: token.id
    }
  });
};

export const verifyToken = async (token: string): Promise<Payload> => {
  return jwt.verify(token, config.jwt.secret!) as Payload;
};
