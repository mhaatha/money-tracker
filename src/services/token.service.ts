import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config/config';
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

export const verifyToken = async (token: string): Promise<Payload> => {
  return jwt.verify(token, config.jwt.secret!) as Payload;
};
