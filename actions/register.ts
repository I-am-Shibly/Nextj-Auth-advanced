'use server';
import { z } from 'zod';
import { RegisterSchema } from '@/schemas';

export const register = async (value: z.infer<typeof RegisterSchema>) => {
  const isValid = RegisterSchema.safeParse(value);

  if (!isValid.success) {
    return { errorMsg: 'invalid credentials!' };
  }

  return { successMsg: 'Registration successfull' };
};
