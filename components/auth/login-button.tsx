'use client';

import { useRouter } from 'next/navigation';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = 'redirect',
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();

  const onclickHandler = () => {
    router.push('/login');
    console.log('clicked');
  };

  return (
    <span className="cursor-pointer" onClick={onclickHandler}>
      {children}
    </span>
  );
};
