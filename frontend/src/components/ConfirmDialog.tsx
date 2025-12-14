import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  dangerous?: boolean; // For destructive actions like delete
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  confirmColor = 'primary',
  onConfirm,
  onCancel,
  loading = false,
  dangerous = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {dangerous ? (
            <WarningIcon color="error" />
          ) : (
            <DeleteIcon color={confirmColor} />
          )}
          {title}
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={loading}>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          color={confirmColor}
          variant="contained"
          disabled={loading}
          autoFocus
        >
          {loading ? 'Chargement...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/**
 * Hook pour gérer l'état d'un dialog de confirmation
 */
export const useConfirmDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const callbackRef = React.useRef<(() => void | Promise<void>) | null>(null);

  const openDialog = (callback: () => void | Promise<void>) => {
    callbackRef.current = callback;
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (callbackRef.current) {
      setLoading(true);
      try {
        await callbackRef.current();
        setOpen(false);
      } catch (error) {
        console.error('Error in confirmation callback:', error);
        // Keep dialog open on error
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    if (!loading) {
      setOpen(false);
      callbackRef.current = null;
    }
  };

  return {
    open,
    loading,
    openDialog,
    handleConfirm,
    handleCancel,
  };
};
