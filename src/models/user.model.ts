import { User } from '@prisma/client';

export interface ResponseGetUser {
  id: string;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponseGetUserBalance {
  balance: number;
}

export const toResponseGetUser = (data: User): ResponseGetUser => {
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

export const toResponseGetUserBalance = (data: User): ResponseGetUserBalance => {
  return {
    balance: data.total_balance
  };
};

export interface RequestUpdate {
  username: string | null;
  email: string | null;
  password: string | null;
  first_name: string | null;
  last_name: string | null;
}

export interface ResponseUpdate {
  username: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const toResponseUpdate = (data: User): ResponseUpdate => {
  return {
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
};
