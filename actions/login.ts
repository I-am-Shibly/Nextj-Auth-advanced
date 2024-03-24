'use server';
import { z } from 'zod';
import { LoginSchema } from '@/schemas';

export const login = async (value: z.infer<typeof LoginSchema>) => {
  const isValid = LoginSchema.safeParse(value);

  if (!isValid.success) {
    return { errorMsg: 'invalid credentials!' };
  }

  return { successMsg: 'Logged in successfully' };
};
