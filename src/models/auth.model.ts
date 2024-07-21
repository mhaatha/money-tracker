import { User } from '@prisma/client';

export interface RequestBody {
  username: string;
  email: string;
  password: string;
  first_name: string | null;
  last_name: string | null;
}

export interface ResponseData {
  id: string;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  total_balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export const toAuthResponse = (data: User): ResponseData => {
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    total_balance: data.total_balance,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
};
