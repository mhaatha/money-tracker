import { z, ZodType } from 'zod';

export const tokenBodyRequest: ZodType = z
  .object({
    refreshToken: z
      .string()
      .regex(/^eyJ[a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_.+/=]+$/, {
        message: 'Refresh token is not valid'
      })
  })
  .strict();
