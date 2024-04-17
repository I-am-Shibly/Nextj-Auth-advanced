'use client';

import { useSearchParams } from 'next/navigation';
import { CardWrapper } from './CardWrapper';
import { BeatLoader } from 'react-spinners';
import { useCallback, useEffect, useState } from 'react';
import { verifyToken } from '@/actions/verifyToken';
import { FormSuccess } from '../form-success';
import { FormError } from '../form-error';

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Token missing!');
      return;
    }

    verifyToken(token)
      .then((data) => {
        setSuccess(data.successMsg);
        setError(data.errorMsg);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="token verification"
      backButtonHref="/auth/login"
      backButtonLabel="back to login"
    >
      <div className="flex justify-center items-center w-full">
        {!success && !error && <BeatLoader />}

        <FormSuccess message={success || ''} />
        <FormError message={error || ''} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
