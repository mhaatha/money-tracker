import { z, ZodType } from 'zod';

export const requestBody: ZodType = z
  .object({
    username: z
      .string()
      .min(6)
      .max(20)
      .regex(/^[a-z]*$/, { message: 'Username must be lowercase' }),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .regex(/^(?=.*[A-Za-z])(?=.*\d).+/, {
        message:
          'Password must be at least 8 characters and must contain 1 letter and 1 number'
      }),
    first_name: z
      .string()
      .min(3)
      .max(50)
      .regex(/^(?:[A-Z][a-z]*)(?:\s[A-Z][a-z]*)*$/, {
        message: 'First_name must be at least 3 characters and cannot exceed 50'
      })
      .optional(),
    last_name: z
      .string()
      .min(3)
      .max(50)
      .regex(/^(?:[A-Z][a-z]*)(?:\s[A-Z][a-z]*)*$/, {
        message: 'Last_name must be at least 3 characters and cannot exceed 50'
      })
      .optional()
  })
  .strict();
