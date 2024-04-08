import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface formErrorProps {
  message: string;
  special?: boolean
}

export const FormError = ({ message, special }: formErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 flex rounded-md items-center text-destructive gap-x-2 text-sm">
      {!special && <ExclamationTriangleIcon className="h-4 w-4" />}
      { special && <ExclamationTriangleIcon className="h-10 w-10" />}
      <p>{message}</p>
    </div>
  );
};
