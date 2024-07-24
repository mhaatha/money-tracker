import { prisma } from '../../prisma';
import { validate } from '../validations/validation';
import { StatusCodes } from 'http-status-codes';
import { ResponseError } from '../utils/response-error';
import { Category, Mutation_Ledger, User } from '@prisma/client';
import {
  mutationLedgerBodyRequest,
  updateMutation
} from '../validations/mutationLedger.validation';
import {
  RequestBody,
  ResponseBody,
  UpdateRequestBody
} from '../models/mutationLedger.model';

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

export const getMutations = async (userId: string): Promise<ResponseBody[]> => {
  // VALIDATION: IS USER EXISTS
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!user) {
    throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found', {
      path: 'user_id'
    });
  }

  // QUERY
  const mutations: ResponseBody[] = await prisma.mutation_Ledger.findMany({
    where: {
      user_id: userId
    }
  });
  if (!mutations) {
    throw new ResponseError(StatusCodes.NOT_FOUND, 'Mutation not found', {
      path: 'user_id'
    });
  }

  return mutations;
};

export const updateMutations = async (
  data: UpdateRequestBody,
  mutationId: string
): Promise<ResponseBody> => {
  const updateData: UpdateRequestBody = validate(updateMutation, data);

  // VALIDATION: IS MUTATION EXISTS
  const mutation: Mutation_Ledger | null = await prisma.mutation_Ledger.findUnique({
    where: {
      id: mutationId
    }
  });
  if (!mutation) {
    throw new ResponseError(StatusCodes.NOT_FOUND, 'Mutation not found', {
      path: 'mutationId'
    });
  }

  // VALIDATION: IS USER EXISTS
  if (updateData.user_id) {
    const user: User | null = await prisma.user.findUnique({
      where: {
        id: updateData.user_id
      }
    });
    if (!user) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'User not found', {
        path: 'user_id'
      });
    }
  }

  // VALIDATION: IS CATEGORY EXISTS
  if (updateData.category_id) {
    const category: Category | null = await prisma.category.findUnique({
      where: {
        id: updateData.category_id
      }
    });
    if (!category) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'Category not found', {
        path: 'category_id'
      });
    }
  }

  // UPDATE MUTATION
  const mutationLedger = await prisma.mutation_Ledger.update({
    where: {
      id: mutationId
    },
    data: {
      type: updateData.type || mutation.type,
      user_id: updateData.user_id || mutation.user_id,
      category_id: updateData.category_id || mutation.category_id,
      amount: updateData.amount || mutation.amount
    }
  });

  // UPDATE USER TOTAL_BALANCE VALUE
  if (updateData.type === 'Income') {
    await prisma.user.update({
      where: {
        id: updateData.user_id || mutation.user_id
      },
      data: {
        total_balance: {
          increment: updateData.amount || mutation.amount
        }
      }
    });
  } else {
    await prisma.user.update({
      where: {
        id: updateData.user_id || mutation.user_id
      },
      data: {
        total_balance: {
          decrement: updateData.amount || mutation.amount
        }
      }
    });
  }

  return mutationLedger;
};

export const deleteMutation = async (mutationId: string): Promise<void> => {
  // VALIDATION: IS MUTATION EXISTS
  const mutation: Mutation_Ledger | null = await prisma.mutation_Ledger.findUnique({
    where: {
      id: mutationId
    }
  });
  if (!mutation) {
    throw new ResponseError(StatusCodes.NOT_FOUND, 'Mutation not found', {
      path: 'mutationId'
    });
  }

  // DELETE MUTATION
  await prisma.mutation_Ledger.delete({
    where: {
      id: mutationId
    }
  });
};
