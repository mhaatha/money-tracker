import { User } from '@prisma/client';

export interface RequestRegister {
  username: string;
  email: string;
  password: string;
  first_name: string | null;
  last_name: string | null;
}

export interface RequestLogin {
  username: string;
  password: string;
}

export interface ResponseRegister {
  id: string;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  total_balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponseLogin {
  id: string;
  username: string;
}

export const toRegisterResponse = (data: User): ResponseRegister => {
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

export const toLoginResponse = (data: User): ResponseLogin => {
  return {
    id: data.id,
    username: data.username
  };
};
