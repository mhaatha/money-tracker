import { z, ZodType } from 'zod';

export const categoryBodyRequest: ZodType = z
  .object({
    name: z
      .string()
      .min(1, {
        message: 'Name must be at least 1 character and cannot exceed 30 characters'
      })
      .max(30, {
        message: 'Name must be at least 1 character and cannot exceed 30 characters'
      })
  })
  .strict();
