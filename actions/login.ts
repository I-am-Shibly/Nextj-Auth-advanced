'use server';
import { z } from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async (value: z.infer<typeof LoginSchema>) => {
  const isValid = LoginSchema.safeParse(value);

  if (!isValid.success) {
    return { errorMsg: 'invalid credentials!' };
  }

  const { email, password } = isValid.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { successMsg: 'Logged in successfully' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { errorMsg: 'Invalid Credentials' };

        default:
          return { errorMsg: 'something went wrong!' };
      }
    }
    throw error;
  }
};
