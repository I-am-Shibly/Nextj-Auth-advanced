'use server';
import { z } from 'zod';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const register = async (value: z.infer<typeof RegisterSchema>) => {
  const isValid = RegisterSchema.safeParse(value);

  if (!isValid.success) {
    return { errorMsg: 'invalid credentials!' };
  }

  const { username, email, password } = isValid.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { errorMsg: 'Email already in use!' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword,
    },
  });

  return { successMsg: 'User has been registered successfully!' };
};
