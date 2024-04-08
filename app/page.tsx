import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/login-button';
import LoadingButton from '@/components/auth/loadingButton';

const font = Poppins({ subsets: ['latin'], weight: ['600'] });

export default function Home() {
  return (
    <main className="flex h-full justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            'font-semibold text-6xl drop-shadow-md text-white',
            font.className
          )}
        >
          🔐 Auth
        </h1>
        <p className="text-white text-xl">A simple auth service</p>
        <LoginButton fallback={<LoadingButton />}>
          <Button variant="secondary" size="lg" className="mt-8">
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
