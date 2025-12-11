import { Box, Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

interface VehicleScannerDialogProps {
  open: boolean;
  onClose: () => void;
  onScan: (err: unknown, result: any) => void;
}

export default function VehicleScannerDialog({ open, onClose, onScan }: VehicleScannerDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <Box sx={{ p: 2, bgcolor: '#000', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Scanner le VIN</Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ height: 400, bgcolor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {open && (
          <BarcodeScannerComponent
            width={500}
            height={500}
            onUpdate={onScan}
          />
        )}
      </Box>
    </Dialog>
  );
}
