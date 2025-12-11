import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useState } from 'react';
import VehicleScannerDialog from './VehicleScannerDialog';

interface VehicleCreationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onScanSuccess: (result: string) => void;
  isPending: boolean;
}

export default function VehicleCreationDialog({
  open,
  onClose,
  onSubmit,
  formData,
  onChange,
  onScanSuccess,
  isPending,
}: VehicleCreationDialogProps) {
  const [scanOpen, setScanOpen] = useState(false);

  const handleScan = (err: unknown, result: any) => {
    if (result) {
      onScanSuccess(result.text);
      setScanOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight="bold">Nouveau Véhicule</DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="marque"
                  label="Marque"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.marque}
                  onChange={onChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  margin="dense"
                  name="modele"
                  label="Modèle"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.modele}
                  onChange={onChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  margin="dense"
                  name="immatriculation"
                  label="Immatriculation"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.immatriculation}
                  onChange={onChange}
                  required
                />
              </Grid>
              <Grid size={{ xs: 8 }}>
                <TextField
                  margin="dense"
                  name="numeroSerie"
                  label="Numéro de Série (VIN)"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.numeroSerie}
                  onChange={onChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setScanOpen(true)} edge="end" color="primary">
                          <QrCodeScannerIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <TextField
                  margin="dense"
                  name="annee"
                  label="Année"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formData.annee}
                  onChange={onChange}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={onClose} color="inherit">
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="warning"
              disabled={isPending}
            >
              {isPending ? 'Création...' : 'Créer'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <VehicleScannerDialog
        open={scanOpen}
        onClose={() => setScanOpen(false)}
        onScan={handleScan}
      />
    </>
  );
}
