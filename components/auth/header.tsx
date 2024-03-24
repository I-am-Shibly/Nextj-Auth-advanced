import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const font = Poppins({ subsets: ['latin'], weight: ['600'] });

interface CardHeaderProps {
  label: string;
}

export const Header = ({ label }: CardHeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-3 justify-center items-center">
      <h1 className={cn('font-semibold text-3xl', font.className)}>🔐 Auth</h1>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  );
};
