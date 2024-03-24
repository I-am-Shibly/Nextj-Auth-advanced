import Link from 'next/link';
import { Button } from '../ui/button';

interface BackButtonProps {
  href: string;
  lable: string;
}

export const BackBtn = ({ href, lable }: BackButtonProps) => {
  return (
    <Button variant="link" size="sm" className="font-normal w-full">
      <Link href={href}>{lable}</Link>
    </Button>
  );
};
