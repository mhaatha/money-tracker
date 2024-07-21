import { prisma } from '../../prisma';
import { RequestBody, ResponseData, toAuthResponse } from '../models/auth.model';
import { requestBody } from '../validations/auth.validation';
import { validate } from '../validations/validation';
import bcrypt from 'bcrypt';

export const create = async (data: RequestBody): Promise<ResponseData> => {
  const registerBody: RequestBody = validate(requestBody, data);

  // BCRYPT PASSWORD
  registerBody.password = await bcrypt.hash(registerBody.password, 10);
  const user = await prisma.user.create({
    data: {
      username: registerBody.username,
      email: registerBody.email,
      password: registerBody.password,
      first_name: registerBody.first_name,
      last_name: registerBody.last_name,
      total_balance: 0
    }
  });

  return toAuthResponse(user);
};
