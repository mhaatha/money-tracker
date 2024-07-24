import { User } from '@prisma/client';

export interface GetUserResponse {
  id: string;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetUserBalanceResponse {
  balance: number;
}

export const toGetUserResponse = (data: User): GetUserResponse => {
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
};

export const toGetUserBalanceResponse = (data: User): GetUserBalanceResponse => {
  return {
    balance: data.total_balance
  };
};

export interface UpdateBodyRequest {
  username: string | null;
  email: string | null;
  password: string | null;
  first_name: string | null;
  last_name: string | null;
}

export interface UpdateBodyResponse {
  username: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const toUpdateUserResponse = (data: User): UpdateBodyResponse => {
  return {
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
};
