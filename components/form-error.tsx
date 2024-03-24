import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface formErrorProps {
  message: string;
}

export const FormError = ({ message }: formErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 flex rounded-md items-center text-destructive gap-x-2 text-sm">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
