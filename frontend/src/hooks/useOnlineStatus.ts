import { useState, useEffect } from 'react';

export interface OnlineStatus {
  isOnline: boolean;
  wasOffline: boolean; // True if was offline and just came back online
}

/**
 * Hook pour détecter le statut de connexion internet
 */
export const useOnlineStatus = () => {
  const [status, setStatus] = useState<OnlineStatus>({
    isOnline: navigator.onLine,
    wasOffline: false,
  });

  useEffect(() => {
    const handleOnline = () => {
      setStatus({
        isOnline: true,
        wasOffline: true, // User just came back online
      });

      // Reset wasOffline after 5 seconds
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, wasOffline: false }));
      }, 5000);
    };

    const handleOffline = () => {
      setStatus({
        isOnline: false,
        wasOffline: false,
      });
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return status;
};
