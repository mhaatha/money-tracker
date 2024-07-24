import { z, ZodType } from 'zod';

export const userBodyRequest: ZodType = z.object({
  username: z
    .string()
    .min(6)
    .max(20)
    .regex(/^[a-z]*$/, {
      message:
        'Username must be lowercase and cannot contain number or special characters'
    })
    .optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+/, {
      message:
        'Password must be at least 8 characters and must contain 1 letter and 1 number'
    })
    .optional(),
  first_name: z
    .string()
    .min(3)
    .max(50)
    .regex(/^(?:[A-Z][a-z]*)(?:\s[A-Z][a-z]*)*$/, {
      message: 'First_name must be starts with uppercase'
    })
    .optional(),
  last_name: z
    .string()
    .min(3)
    .max(50)
    .regex(/^(?:[A-Z][a-z]*)(?:\s[A-Z][a-z]*)*$/, {
      message: 'Last_name must be starts with uppercase'
    })
    .optional()
});
