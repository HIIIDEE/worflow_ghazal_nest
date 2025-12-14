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
import { useState, useEffect } from 'react';
import VehicleScannerDialog from './VehicleScannerDialog';
import { validateVehicle } from '../../../utils/validation';

interface VehicleCreationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onScanSuccess: (result: string) => void;
  isPending: boolean;
  editMode?: boolean;
}

export default function VehicleCreationDialog({
  open,
  onClose,
  onSubmit,
  formData,
  onChange,
  onScanSuccess,
  isPending,
  editMode = false,
}: VehicleCreationDialogProps) {
  const [scanOpen, setScanOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate form whenever formData changes
  useEffect(() => {
    const validation = validateVehicle(formData);
    setErrors(validation.errors);
  }, [formData]);

  const handleScan = (_err: unknown, result: any) => {
    if (result) {
      onScanSuccess(result.text);
      setScanOpen(false);
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all fields as touched
    setTouched({
      immatriculation: true,
      marque: true,
      modele: true,
      annee: true,
      numeroSerie: true,
    });

    // Only submit if valid
    const validation = validateVehicle(formData);
    if (validation.valid) {
      onSubmit(e);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight="bold">
          {editMode ? 'Modifier le Véhicule' : 'Nouveau Véhicule'}
        </DialogTitle>
        <form onSubmit={handleFormSubmit}>
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
                  onBlur={() => handleBlur('marque')}
                  error={touched.marque && !!errors.marque}
                  helperText={touched.marque && errors.marque}
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
                  onBlur={() => handleBlur('modele')}
                  error={touched.modele && !!errors.modele}
                  helperText={touched.modele && errors.modele}
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
                  onBlur={() => handleBlur('immatriculation')}
                  error={touched.immatriculation && !!errors.immatriculation}
                  helperText={touched.immatriculation ? errors.immatriculation : 'Formats: XX-123-XX ou 123 AB 12'}
                  placeholder="AB-123-CD ou 1234 AB 12"
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
                  onBlur={() => handleBlur('numeroSerie')}
                  error={touched.numeroSerie && !!errors.numeroSerie}
                  helperText={touched.numeroSerie ? errors.numeroSerie : '17 caractères alphanumériques (sans I, O, Q)'}
                  placeholder="VF3LCYHZPHS123456"
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
                  onBlur={() => handleBlur('annee')}
                  error={touched.annee && !!errors.annee}
                  helperText={touched.annee && errors.annee}
                  inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
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
              disabled={isPending || Object.keys(errors).length > 0}
            >
              {isPending
                ? (editMode ? 'Modification...' : 'Création...')
                : (editMode ? 'Modifier' : 'Créer')
              }
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
