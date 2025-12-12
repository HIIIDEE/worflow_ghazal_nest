import { useRef, useEffect, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Box, Button, Typography, Paper } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

interface SignaturePadProps {
  label: string;
  value?: string;
  onChange: (signature: string) => void;
  disabled?: boolean;
}


export default function SignaturePad({ label, value, onChange, disabled }: SignaturePadProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 150 });

  // Handle Resize to fix offset issue
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setCanvasSize({ width, height: 150 });

        // Preserve data on resize if exists
        if (sigCanvas.current && value) {
          // Small timeout to allow canvas to resize before redrawing
          setTimeout(() => {
            sigCanvas.current?.fromDataURL(value);
          }, 0);
        }
      }
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize(); // Initial call

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [value]);

  useEffect(() => {
    if (value && sigCanvas.current) {
      sigCanvas.current.fromDataURL(value);
    }
  }, [value, canvasSize]); // Re-draw when value OR size changes

  const handleClear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      onChange('');
    }
  };

  const handleEnd = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      // Get the trimmed URL (or full canvas)
      // Note: for responsive canvas, it's often better to just getDataURL() or trim()
      const dataUrl = sigCanvas.current.toDataURL('image/png');
      onChange(dataUrl);
    }
  };

  return (
    <Box sx={{ mb: 2 }} ref={containerRef}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b' }}>
          {label}
        </Typography>
        {!disabled && (
          <Button
            size="small"
            startIcon={<ClearIcon />}
            onClick={handleClear}
            sx={{ textTransform: 'none' }}
          >
            Effacer
          </Button>
        )}
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: '2px solid #e2e8f0',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: disabled ? '#f8fafc' : 'white',
          position: 'relative',
          height: 154, // Container height (150 + borders)
        }}
      >
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            width: canvasSize.width,
            height: canvasSize.height,
            style: {
              width: '100%',
              height: '100%',
              cursor: disabled ? 'not-allowed' : 'crosshair',
              display: 'block', // Remove inline-block spacing
            },
          }}
          onEnd={handleEnd}
          backgroundColor={disabled ? '#f8fafc' : 'white'}
          penColor="#1e293b"
        />

        {!value && !disabled && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: '#94a3b8',
            }}
          >
            <EditIcon />
            <Typography variant="body2">Signez ici</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
