'use client';

import { CardWrapper } from './CardWrapper';
import { FormError } from '../form-error';
import { useSearchParams } from 'next/navigation';

function ErrorCard() {
  const searchParam = useSearchParams();

  const urlError = searchParam.get('error') === 'OAuthAccountNotLinked';

  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="back to login"
    >
      {urlError && (
        <FormError
          message="Email already in use with another provider. Try with a different email address"
          special
        />
      )}
    </CardWrapper>
  );
}

export default ErrorCard;
