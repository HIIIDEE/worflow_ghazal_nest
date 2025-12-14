import { useEffect, useRef, useState } from 'react';

export interface AutoSaveOptions<T> {
  key: string; // Unique key for localStorage
  data: T; // Data to save
  delay?: number; // Debounce delay in ms (default: 2000)
  onSave?: (data: T) => void | Promise<void>; // Callback when auto-save occurs
  enabled?: boolean; // Enable/disable auto-save (default: true)
}

export interface AutoSaveStatus {
  isSaving: boolean;
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;
}

/**
 * Hook pour auto-sauvegarder les données d'un formulaire
 * Sauvegarde dans localStorage avec debounce pour éviter trop d'écritures
 */
export const useAutoSave = <T>({
  key,
  data,
  delay = 2000,
  onSave,
  enabled = true,
}: AutoSaveOptions<T>) => {
  const [status, setStatus] = useState<AutoSaveStatus>({
    isSaving: false,
    lastSaved: null,
    hasUnsavedChanges: false,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousDataRef = useRef<T>(data);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip auto-save on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Try to load saved data
      const saved = loadSavedData<T>(key);
      if (saved) {
        setStatus((prev) => ({
          ...prev,
          lastSaved: saved.timestamp,
          hasUnsavedChanges: false,
        }));
      }
      return;
    }

    if (!enabled) {
      return;
    }

    // Check if data has actually changed
    const dataChanged = JSON.stringify(data) !== JSON.stringify(previousDataRef.current);
    if (!dataChanged) {
      return;
    }

    previousDataRef.current = data;
    setStatus((prev) => ({ ...prev, hasUnsavedChanges: true }));

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(async () => {
      setStatus((prev) => ({ ...prev, isSaving: true }));

      try {
        // Save to localStorage
        const saveData = {
          data,
          timestamp: new Date(),
        };
        localStorage.setItem(key, JSON.stringify(saveData));

        // Call optional callback
        if (onSave) {
          await onSave(data);
        }

        setStatus({
          isSaving: false,
          lastSaved: new Date(),
          hasUnsavedChanges: false,
        });
      } catch (error) {
        console.error('Auto-save error:', error);
        setStatus((prev) => ({ ...prev, isSaving: false }));
      }
    }, delay);

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, enabled, delay, key, onSave]);

  /**
   * Manually trigger a save (bypasses debounce)
   */
  const saveNow = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setStatus((prev) => ({ ...prev, isSaving: true }));

    try {
      const saveData = {
        data,
        timestamp: new Date(),
      };
      localStorage.setItem(key, JSON.stringify(saveData));

      if (onSave) {
        await onSave(data);
      }

      setStatus({
        isSaving: false,
        lastSaved: new Date(),
        hasUnsavedChanges: false,
      });
    } catch (error) {
      console.error('Manual save error:', error);
      setStatus((prev) => ({ ...prev, isSaving: false }));
      throw error;
    }
  };

  /**
   * Clear saved data from localStorage
   */
  const clearSavedData = () => {
    localStorage.removeItem(key);
    setStatus({
      isSaving: false,
      lastSaved: null,
      hasUnsavedChanges: false,
    });
  };

  return {
    ...status,
    saveNow,
    clearSavedData,
  };
};

/**
 * Load saved data from localStorage
 */
export const loadSavedData = <T>(key: string): { data: T; timestamp: Date } | null => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);
    return {
      data: parsed.data,
      timestamp: new Date(parsed.timestamp),
    };
  } catch (error) {
    console.error('Error loading saved data:', error);
    return null;
  }
};

/**
 * Format time since last save
 */
export const formatTimeSince = (date: Date | null): string => {
  if (!date) {
    return 'Jamais sauvegardé';
  }

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 5) {
    return 'À l\'instant';
  }
  if (seconds < 60) {
    return `Il y a ${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `Il y a ${minutes}min`;
  }

  const hours = Math.floor(minutes / 60);
  return `Il y a ${hours}h`;
};
