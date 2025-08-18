'use client';

import { ErrorPage } from '@/components/home';

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <ErrorPage 
      title="Algo no anduvo como se esperaba!"
      description="Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo."
      actionText="Inténtalo de nuevo"
      onAction={reset}
    />
  );
}