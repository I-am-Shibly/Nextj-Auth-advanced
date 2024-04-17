'use server';

import { getVerificationTokenByToken } from '@/data/getToken';
import { getUserByEmail } from '@/data/getUser';
import { db } from '@/lib/db';

export const verifyToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { errorMsg: 'Token Not found!' };
  }

  if (new Date(existingToken.expires) < new Date()) {
    return { errorMsg: 'Token expired!' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { errorMsg: 'User not found with this email!' };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { successMsg: 'Email verified!' };
};
