/**
 * Types d'erreurs standardisés pour l'application
 */

export const ErrorType = {
  VALIDATION: "VALIDATION_ERROR",
  AUTHENTICATION: "AUTHENTICATION_ERROR",
  AUTHORIZATION: "AUTHORIZATION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  SERVER: "SERVER_ERROR",
  NETWORK: "NETWORK_ERROR",
  UNKNOWN: "UNKNOWN_ERROR",
} as const;

export type ErrorType = (typeof ErrorType)[keyof typeof ErrorType];

export interface ApiError {
  type: ErrorType;
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>; // Validation errors (field -> messages[])
  timestamp?: string;
}

export interface ValidationError extends ApiError {
  type: typeof ErrorType.VALIDATION;
  errors: Record<string, string[]>;
}

export interface AuthError extends ApiError {
  type: typeof ErrorType.AUTHENTICATION | typeof ErrorType.AUTHORIZATION;
}

/**
 * Parse error from axios response
 */
export const parseApiError = (error: any): ApiError => {
  // Network error (no response from server)
  if (!error.response) {
    return {
      type: ErrorType.NETWORK,
      message:
        "Impossible de se connecter au serveur. Vérifiez votre connexion internet.",
      statusCode: 0,
    };
  }

  const { status, data } = error.response;

  // Map status codes to error types
  let errorType: ErrorType;
  let message: string = data.message || "Une erreur est survenue";

  switch (status) {
    case 400:
      errorType = ErrorType.VALIDATION;
      // NestJS validation errors format
      if (Array.isArray(data.message)) {
        message = data.message.join(", ");
      }
      break;
    case 401:
      errorType = ErrorType.AUTHENTICATION;
      message = "Vous devez vous connecter pour accéder à cette ressource";
      break;
    case 403:
      errorType = ErrorType.AUTHORIZATION;
      message =
        "Vous n'avez pas les permissions nécessaires pour effectuer cette action";
      break;
    case 404:
      errorType = ErrorType.NOT_FOUND;
      message = "La ressource demandée n'existe pas";
      break;
    case 409:
      errorType = ErrorType.CONFLICT;
      message = data.message || "Cette ressource existe déjà";
      break;
    case 500:
    case 502:
    case 503:
      errorType = ErrorType.SERVER;
      message =
        "Une erreur serveur est survenue. Veuillez réessayer plus tard.";
      break;
    default:
      errorType = ErrorType.UNKNOWN;
  }

  // Parse validation errors if present
  let errors: Record<string, string[]> | undefined;
  if (errorType === ErrorType.VALIDATION && Array.isArray(data.message)) {
    errors = {};
    data.message.forEach((msg: string) => {
      // Try to extract field name from error message
      const match = msg.match(/^(\w+):/);
      if (match) {
        const field = match[1];
        if (!errors![field]) {
          errors![field] = [];
        }
        errors![field].push(msg);
      }
    });
  }

  return {
    type: errorType,
    message,
    statusCode: status,
    errors,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Get user-friendly error message
 */
export const getErrorMessage = (error: any): string => {
  const apiError = parseApiError(error);
  return apiError.message;
};

/**
 * Check if error is a specific type
 */
export const isErrorType = (error: any, type: ErrorType): boolean => {
  const apiError = parseApiError(error);
  return apiError.type === type;
};

/**
 * Get validation errors for a specific field
 */
export const getFieldErrors = (error: any, field: string): string[] => {
  const apiError = parseApiError(error);
  if (apiError.type === ErrorType.VALIDATION && apiError.errors) {
    return apiError.errors[field] || [];
  }
  return [];
};
