import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Stack,
  Chip,
  IconButton,
  Tooltip,
  Badge as MuiBadge,
} from '@mui/material';
import {
  FormatPaint as FormatPaintIcon,
  PushPin as PushPinIcon,
  TripOrigin as TripOriginIcon,
  Brush as BrushIcon,
  ContentCut as ContentCutIcon,
  BrokenImage as BrokenImageIcon,
  Build as BuildIcon,
  DirectionsCar as DirectionsCarIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

export interface Annotation {
  id: string;
  anomalyId: number;
  anomalyLabel: string;
  x: number;
  y: number;
  timestamp: string;
}

interface CarInspectionAnnotatorProps {
  annotations: Annotation[];
  onChange: (annotations: Annotation[]) => void;
  disabled?: boolean;
}

const ANOMALIES = [
  { id: 1, label: 'Ecaillage de peinture', icon: <FormatPaintIcon fontSize="small" />, color: '#ef4444' },
  { id: 2, label: 'Enfoncement', icon: <PushPinIcon fontSize="small" />, color: '#f97316' },
  { id: 3, label: 'Bosse', icon: <TripOriginIcon fontSize="small" />, color: '#f59e0b' },
  { id: 4, label: 'Egratignure', icon: <BrushIcon fontSize="small" />, color: '#eab308' },
  { id: 5, label: 'Déchirure - pli', icon: <ContentCutIcon fontSize="small" />, color: '#84cc16' },
  { id: 6, label: 'Fissure', icon: <BrokenImageIcon fontSize="small" />, color: '#06b6d4' },
  { id: 7, label: 'Anomalie TB', icon: <BuildIcon fontSize="small" />, color: '#8b5cf6' },
  { id: 8, label: 'Anomalie moteur', icon: <DirectionsCarIcon fontSize="small" />, color: '#ec4899' },
];

export default function CarInspectionAnnotator({
  annotations,
  onChange,
  disabled = false,
}: CarInspectionAnnotatorProps) {
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<number | null>(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleAnomalySelect = (_event: React.MouseEvent<HTMLElement>, value: number | null) => {
    if (disabled) return;
    setSelectedAnomalyId(value);
  };

  const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedAnomalyId || disabled || !imageLoaded) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const anomaly = ANOMALIES.find((a) => a.id === selectedAnomalyId);
    if (!anomaly) return;

    const newAnnotation: Annotation = {
      id: crypto.randomUUID(),
      anomalyId: selectedAnomalyId,
      anomalyLabel: anomaly.label,
      x: Math.max(5, Math.min(95, x)), // Keep within 5%-95% bounds
      y: Math.max(5, Math.min(95, y)),
      timestamp: new Date().toISOString(),
    };

    onChange([...annotations, newAnnotation]);
    setSelectedAnomalyId(null); // Deselect after placing
  };

  const handleDeleteAnnotation = (id: string) => {
    if (disabled) return;
    onChange(annotations.filter((annotation) => annotation.id !== id));
  };

  const getAnomalyColor = (anomalyId: number): string => {
    return ANOMALIES.find((a) => a.id === anomalyId)?.color || '#64748b';
  };

  const getAnomalyIcon = (anomalyId: number) => {
    return ANOMALIES.find((a) => a.id === anomalyId)?.icon || <InfoIcon fontSize="small" />;
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 2, color: '#64748b' }}>
        Sélectionnez une anomalie puis cliquez sur l'image pour la placer
      </Typography>

      {/* Anomaly Selector */}
      <ToggleButtonGroup
        value={selectedAnomalyId}
        exclusive
        onChange={handleAnomalySelect}
        sx={{
          mb: 3,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          '& .MuiToggleButtonGroup-grouped': {
            border: '1px solid #e2e8f0',
            borderRadius: '8px !important',
            margin: 0,
            '&.Mui-selected': {
              bgcolor: '#eff6ff',
              borderColor: '#2563eb',
              color: '#2563eb',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#dbeafe',
              },
            },
            '&:hover': {
              bgcolor: '#f8fafc',
            },
          },
        }}
      >
        {ANOMALIES.map((anomaly) => (
          <ToggleButton
            key={anomaly.id}
            value={anomaly.id}
            disabled={disabled}
            sx={{
              px: 2,
              py: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
              textTransform: 'none',
              minWidth: '110px',
            }}
          >
            <Box sx={{ color: anomaly.color }}>{anomaly.icon}</Box>
            <Typography variant="caption" sx={{ fontSize: '0.7rem', lineHeight: 1.2, textAlign: 'center' }}>
              {anomaly.label}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Image Container */}
      <Paper
        ref={imageContainerRef}
        sx={{
          position: 'relative',
          cursor: selectedAnomalyId && imageLoaded ? 'crosshair' : 'default',
          border: selectedAnomalyId ? '2px solid #2563eb' : '2px solid #e2e8f0',
          overflow: 'hidden',
          transition: 'border-color 0.2s',
          bgcolor:  'transparent',
          minHeight:'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={handleImageClick}
      >
           <img
              //src="/car-inspection.png"
              src={`${import.meta.env.BASE_URL}/car-inspection.png`}
              alt="Inspection du véhicule"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxWidth: '800px',
              }}
              onLoad={() => setImageLoaded(true)}
             
            />

            {/* Markers */}
            {annotations.map((annotation, index) => {
              const isHovered = hoveredMarkerId === annotation.id;
              return (
                <Tooltip
                  key={annotation.id}
                  title={
                    <Box sx={{ p: 0.5 }}>
                      <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                        {annotation.anomalyLabel}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#cbd5e1' }}>
                        Cliquez pour supprimer
                      </Typography>
                    </Box>
                  }
                  placement="top"
                  arrow
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      left: `${annotation.x}%`,
                      top: `${annotation.y}%`,
                      transform: 'translate(-50%, -50%)',
                      cursor: disabled ? 'default' : 'pointer',
                      zIndex: 10,
                      animation: 'markerAppear 0.3s ease-out',
                      '@keyframes markerAppear': {
                        '0%': {
                          transform: 'translate(-50%, -50%) scale(0)',
                          opacity: 0,
                        },
                        '50%': {
                          transform: 'translate(-50%, -50%) scale(1.2)',
                        },
                        '100%': {
                          transform: 'translate(-50%, -50%) scale(1)',
                          opacity: 1,
                        },
                      },
                    }}
                    onMouseEnter={() => !disabled && setHoveredMarkerId(annotation.id)}
                    onMouseLeave={() => setHoveredMarkerId(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!disabled) {
                        handleDeleteAnnotation(annotation.id);
                      }
                    }}
                  >
                    <MuiBadge
                      badgeContent={index + 1}
                      sx={{
                        '& .MuiBadge-badge': {
                          bgcolor: getAnomalyColor(annotation.anomalyId),
                          color: 'white',
                          width: isHovered ? 38 : 32,
                          height: isHovered ? 38 : 32,
                          borderRadius: '50%',
                          border: '3px solid white',
                          fontSize: '0.85rem',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                          transition: 'all 0.2s',
                        },
                      }}
                    >
                      <Box sx={{ width: 0, height: 0 }} />
                    </MuiBadge>
                  </Box>
                </Tooltip>
              );
            })}
      </Paper>

      {/* Annotations Summary */}
      {annotations.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InfoIcon sx={{ mr: 1, color: '#2563eb', fontSize: '1.2rem' }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
              Anomalies détectées ({annotations.length})
            </Typography>
          </Box>
          <Stack spacing={1}>
            {annotations.map((annotation, index) => (
              <Paper
                key={annotation.id}
                sx={{
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: '#f1f5f9',
                    borderColor: '#cbd5e1',
                  },
                }}
                elevation={0}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Chip
                    label={index + 1}
                    size="small"
                    sx={{
                      bgcolor: getAnomalyColor(annotation.anomalyId),
                      color: 'white',
                      fontWeight: 'bold',
                      minWidth: '32px',
                    }}
                  />
                  <Box sx={{ color: getAnomalyColor(annotation.anomalyId) }}>
                    {getAnomalyIcon(annotation.anomalyId)}
                  </Box>
                  <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500 }}>
                    {annotation.anomalyLabel}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteAnnotation(annotation.id)}
                  disabled={disabled}
                  sx={{
                    color: '#94a3b8',
                    '&:hover': {
                      color: '#ef4444',
                      bgcolor: '#fee2e2',
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Paper>
            ))}
          </Stack>
        </Box>
      )}

      {/* Empty State */}
      {annotations.length === 0 && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: '#f8fafc',
            border: '1px dashed #cbd5e1',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Aucune anomalie placée. Sélectionnez une anomalie ci-dessus puis cliquez sur l'image pour la placer.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
