import { ZodType } from 'zod';

export const validate = <T>(schema: ZodType, data: T): T => {
  return schema.parse(data);
};
