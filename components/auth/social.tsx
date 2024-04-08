import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const Social = () => {
  const onclickHandler = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex gap-x-3 w-full items-center">
      <Button
        className="w-full"
        size="lg"
        variant="outline"
        onClick={() => onclickHandler('google')}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>

      <Button
        className="w-full"
        size="lg"
        variant="outline"
        onClick={() => onclickHandler('github')}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
