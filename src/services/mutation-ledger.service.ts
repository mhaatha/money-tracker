import { Category, User } from '@prisma/client';
import { RequestBody, ResponseBody } from '../models/mutationLedger.model';
import { mutationLedgerBodyRequest } from '../validations/mutationLedger.validation';
import { validate } from '../validations/validation';
import { prisma } from '../../prisma';
import { ResponseError } from '../utils/response-error';
import { StatusCodes } from 'http-status-codes';

export const createMutationLedger = async (data: RequestBody): Promise<ResponseBody> => {
  const createData: RequestBody = validate(mutationLedgerBodyRequest, data);

  // VALIDATION: IS USER EXISTS
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: createData.user_id
    }
  });
  if (!user) {
    throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found', {
      path: 'user_id'
    });
  }

  // VALIDATION: IS CATEGORY EXISTS
  if (createData.category_id) {
    const category: Category | null = await prisma.category.findUnique({
      where: {
        id: createData.category_id
      }
    });
    if (!category) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'Category not found', {
        path: 'category_id'
      });
    }
  }

  // UPDATE USER TOTAL_BALANCE VALUE
  if (createData.type === 'Income') {
    await prisma.user.update({
      where: {
        id: createData.user_id
      },
      data: {
        total_balance: {
          increment: createData.amount
        }
      }
    });
  } else {
    await prisma.user.update({
      where: {
        id: createData.user_id
      },
      data: {
        total_balance: {
          decrement: createData.amount
        }
      }
    });
  }

  // CREATE MUTATION LEDGER
  const mutationLedger = await prisma.mutation_Ledger.create({
    data: {
      ...createData
    }
  });

  return mutationLedger;
};
