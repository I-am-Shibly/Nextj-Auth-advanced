import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'password is required!' }),
});

export const RegisterSchema = z
  .object({
    username: z.string().min(1, { message: 'username is required!' }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: 'minimum 6 characters are required!' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
