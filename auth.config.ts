import credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './schemas';
import type { NextAuthConfig } from 'next-auth';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from './data/getUser';
import github from 'next-auth/providers/github';
import google from 'next-auth/providers/google';
import { db } from './lib/db';

export default {
  pages: {
    signIn: '/auth/error',
    // error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
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
