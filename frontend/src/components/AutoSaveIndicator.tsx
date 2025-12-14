import React from 'react';
import { Box, Typography, CircularProgress, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SaveIcon from '@mui/icons-material/Save';
import ErrorIcon from '@mui/icons-material/Error';
import { formatTimeSince } from '../hooks/useAutoSave';

export interface AutoSaveIndicatorProps {
  isSaving: boolean;
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;
  error?: string;
}

/**
 * Indicateur visuel de l'état d'auto-save
 */
export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  isSaving,
  lastSaved,
  hasUnsavedChanges,
  error,
}) => {
  if (error) {
    return (
      <Chip
        icon={<ErrorIcon />}
        label="Erreur de sauvegarde"
        color="error"
        size="small"
        variant="outlined"
      />
    );
  }

  if (isSaving) {
    return (
      <Chip
        icon={<CircularProgress size={16} />}
        label="Sauvegarde en cours..."
        color="primary"
        size="small"
        variant="outlined"
      />
    );
  }

  if (hasUnsavedChanges) {
    return (
      <Chip
        icon={<SaveIcon />}
        label="Modifications non sauvegardées"
        color="warning"
        size="small"
        variant="outlined"
      />
    );
  }

  if (lastSaved) {
    return (
      <Chip
        icon={<CheckCircleIcon />}
        label={`Sauvegardé ${formatTimeSince(lastSaved)}`}
        color="success"
        size="small"
        variant="outlined"
      />
    );
  }

  return null;
};
