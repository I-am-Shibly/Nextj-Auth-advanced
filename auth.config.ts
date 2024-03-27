import credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './schemas';
import type { NextAuthConfig } from 'next-auth';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from './data/user';

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const isValid = LoginSchema.safeParse(credentials);

        if (isValid.success) {
          const { email, password } = isValid.data;

          const user = await getUserByEmail(email);

          if (!user || !password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password!);

          if (passwordsMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
