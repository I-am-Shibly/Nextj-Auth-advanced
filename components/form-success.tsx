import { CheckCircledIcon } from '@radix-ui/react-icons';

interface formSuccessProps {
  message: string;
}

export const FormSuccess = ({ message }: formSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 flex rounded-md items-center text-emerald-500 gap-x-2 text-sm">
      <CheckCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
