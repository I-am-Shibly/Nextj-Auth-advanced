'use server';
import { z } from 'zod';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/getUser';
import { generateToken } from '@/lib/generate-token';
import { sendMail } from '@/lib/mail';

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

  const verificationToken = await generateToken(email);

  if (verificationToken) {
    await sendMail(verificationToken.email, verificationToken.token);
    return { successMsg: 'confirmation email sent!' };
  } else {
    return { errorMsg: 'something went wrong. please try again!' };
  }
};
