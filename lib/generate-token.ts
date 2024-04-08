import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { getVerificationTokenByEmail } from '@/data/getToken';

export const generateToken = async (email: string) => {
  const uniqueToken = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }
  const verificationToken = await db.verificationToken.create({
    data: { email, token: uniqueToken, expires },
  });

  return verificationToken;
};
