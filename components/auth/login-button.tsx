'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
  fallback: React.ReactNode;
}

export const LoginButton = ({
  children,
  mode = 'redirect',
  asChild,
  fallback,
}: LoginButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onclickHandler = () => {
    startTransition(() => {
      router.push('/auth/login');
    });
    console.log('clicked');
  };

  return (
    <span className="cursor-pointer" onClick={onclickHandler}>
      {isPending ? fallback : children}
    </span>
  );
};
