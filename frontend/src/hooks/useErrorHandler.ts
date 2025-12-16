import { useState } from 'react';
import { parseApiError,type ApiError, ErrorType } from '../types/errors';

/**
 * Hook pour gérer les erreurs de manière uniforme
 */
export const useErrorHandler = () => {
  const [error, setError] = useState<ApiError | null>(null);

  const handleError = (err: any) => {
    const apiError = parseApiError(err);
    setError(apiError);

    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Error handled:', apiError);
    }

    return apiError;
  };

  const clearError = () => {
    setError(null);
  };

  const isAuthError = () => {
    return (
      error?.type === ErrorType.AUTHENTICATION ||
      error?.type === ErrorType.AUTHORIZATION
    );
  };

  const isValidationError = () => {
    return error?.type === ErrorType.VALIDATION;
  };

  return {
    error,
    handleError,
    clearError,
    isAuthError,
    isValidationError,
  };
};
