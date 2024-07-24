import { z, ZodType } from 'zod';

export const mutationLedgerBodyRequest: ZodType = z
  .object({
    type: z.enum(['Income', 'Expense'], {
      message: 'Type must be Income or Expense'
    }),
    user_id: z
      .string()
      .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, {
        message: 'User_id is not a valid uuid'
      }),
    category_id: z
      .string()
      .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, {
        message: 'Category_id is not a valid uuid'
      })
      .optional(),
    amount: z.number().positive({ message: 'Amount must be a positive number' })
  })
  .strict();
