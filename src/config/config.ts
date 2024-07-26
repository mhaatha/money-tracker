import dotenv from 'dotenv';
import path from 'path';

const envPath =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '../../../.env')
    : path.join(__dirname, '../../.env');

dotenv.config({ path: envPath });

export default {
  env: process.env.NODE_ENV,
  port: 3000,
  logLevel: process.env.LOG_LEVEL,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS
  }
};
