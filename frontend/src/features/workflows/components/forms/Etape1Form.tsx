import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Paper,
  Stack,
  Grid,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CarInspectionAnnotator, {
  type Annotation,
} from "./CarInspectionAnnotator";

interface Etape1FormProps {
  formData: {
    annotations?: Annotation[];
    controles?: { [key: string]: boolean };
    equipementsManquants?: { [key: string]: boolean };
    kilometrage?: number;
  };
  onChange: (data: any) => void;
  disabled?: boolean;
}

const CONTROLES = [
  "État extérieur du véhicule",
  "État intérieur du véhicule",
  "Niveau liquide de refroidissement est-il au <<Min>>",
  "Niveau liquide de refroidissement est-il au <<Max>>",
  "Niveau carburant est-il suffisant pour déplacement véhicule",
];

const EQUIPEMENTS_MANQUANTS = [
  "Boîte à pharmacie",
  "Roue de secours",
  "Manuel d'utilisation",
  "Cosse pièce avant/arrière",
  "Manivelle",
  "Tablette tactile",
  "Antenne",
  "Triangle",
  "Cric",
  "Boîte à outils 5 éléments",
  "État joint trappe à essence",
  "Cache boîte fusible (agrafe rouge)",
  "Téflon au niveau de trappe à essence",
  "Kit (Œillet de sécurité + pince + tournevis)",
];

export default function Etape1Form({
  formData,
  onChange,
  disabled = false,
}: Etape1FormProps) {
  const annotations = formData?.annotations || [];
  const controles = formData?.controles || {};
  const equipementsManquants = formData?.equipementsManquants || {};
  const kilometrage = formData?.kilometrage || "";

  const handleAnnotationsChange = (newAnnotations: Annotation[]) => {
    onChange({ ...formData, annotations: newAnnotations });
  };

  const handleControleChange = (controle: string, checked: boolean) => {
    const newControles = { ...controles, [controle]: checked };
    onChange({ ...formData, controles: newControles });
  };

  const handleEquipementManquantChange = (
    equipement: string,
    checked: boolean,
  ) => {
    const newEquipements = { ...equipementsManquants, [equipement]: checked };
    onChange({ ...formData, equipementsManquants: newEquipements });
  };

  const handleKilometrageChange = (value: string) => {
    const numValue = value === "" ? undefined : parseInt(value, 10);
    onChange({ ...formData, kilometrage: numValue });
  };

  const allControlesChecked = CONTROLES.every((c) => controles[c] === true);

  return (
    <Box>
      {/* Section Inspection Visuelle */}
      <Paper
        sx={{ p: 3, mb: 3, bgcolor: "#f8fafc", border: "1px solid #e2e8f0" }}
        elevation={0}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <ImageSearchIcon sx={{ mr: 1, color: "#2563eb" }} />
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#1e293b" }}>
            Inspection visuelle du véhicule
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mb: 3, color: "#64748b" }}>
          Documentez les anomalies visuelles détectées lors de la réception du
          véhicule
        </Typography>

        <CarInspectionAnnotator
          annotations={annotations}
          onChange={handleAnnotationsChange}
          disabled={disabled}
        />
      </Paper>

      {/* Section Équipements manquants */}
      <Paper
        sx={{ p: 3, mb: 3, bgcolor: "#fff8f1", border: "1px solid #fb923c" }}
        elevation={0}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <WarningAmberIcon sx={{ mr: 1, color: "#ea580c" }} />
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#1e293b" }}>
            Équipements manquants à la réception
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mb: 3, color: "#64748b" }}>
          Mettre une croix (X) sur l'équipement et caractéristiques MANQUANTS à
          la réception
        </Typography>

        <Grid container spacing={2}>
          {EQUIPEMENTS_MANQUANTS.map((equipement, index) => (
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
              key={index}
            >
              <Box
                onClick={() =>
                  !disabled &&
                  handleEquipementManquantChange(
                    equipement,
                    !equipementsManquants[equipement],
                  )
                }
                sx={{ cursor: disabled ? "default" : "pointer" }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    bgcolor: equipementsManquants[equipement]
                      ? "#fee2e2"
                      : "white",
                    border: equipementsManquants[equipement]
                      ? "2px solid #dc2626"
                      : "1px solid #e2e8f0",
                    transition: "all 0.2s",
                    "&:hover": !disabled
                      ? {
                          bgcolor: equipementsManquants[equipement]
                            ? "#fecaca"
                            : "#f8fafc",
                          borderColor: "#dc2626",
                        }
                      : {},
                  }}
                  elevation={0}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={equipementsManquants[equipement] || false}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleEquipementManquantChange(
                            equipement,
                            e.target.checked,
                          );
                        }}
                        disabled={disabled}
                        sx={{
                          color: "#94a3b8",
                          "&.Mui-checked": {
                            color: "#dc2626",
                          },
                          pointerEvents: "auto",
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          color: equipementsManquants[equipement]
                            ? "#1e293b"
                            : "#64748b",
                          fontWeight: equipementsManquants[equipement]
                            ? 600
                            : 400,
                          fontSize: "0.875rem",
                        }}
                      >
                        {equipement}
                      </Typography>
                    }
                    sx={{
                      width: "100%",
                      m: 0,
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  />
                </Paper>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Section Éléments de contrôle */}
      <Paper
        sx={{ p: 3, mb: 3, bgcolor: "#f8fafc", border: "1px solid #e2e8f0" }}
        elevation={0}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <CheckCircleOutlineIcon sx={{ mr: 1, color: "#2563eb" }} />
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#1e293b" }}>
            Éléments de contrôle
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mb: 3, color: "#64748b" }}>
          Cochez tous les éléments vérifiés lors de la réception du véhicule
        </Typography>

        <Stack spacing={1.5}>
          {CONTROLES.map((controle, index) => (
            <Box
              onClick={() =>
                !disabled &&
                handleControleChange(controle, !controles[controle])
              }
              sx={{ cursor: disabled ? "default" : "pointer" }}
            >
              <Paper
                key={index}
                sx={{
                  p: 2,
                  bgcolor: controles[controle] ? "#eff6ff" : "white",
                  border: controles[controle]
                    ? "2px solid #2563eb"
                    : "1px solid #e2e8f0",
                  transition: "all 0.2s",

                  "&:hover": !disabled
                    ? {
                        bgcolor: controles[controle] ? "#dbeafe" : "#f8fafc",
                        borderColor: "#2563eb",
                      }
                    : {},
                }}
                elevation={0}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={controles[controle] || false}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleControleChange(controle, e.target.checked);
                      }}
                      disabled={disabled}
                      sx={{
                        color: "#94a3b8",
                        "&.Mui-checked": {
                          color: "#2563eb",
                        },
                        pointerEvents: "auto",
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{
                        color: controles[controle] ? "#1e293b" : "#64748b",
                        fontWeight: controles[controle] ? 600 : 400,
                      }}
                    >
                      {controle}
                    </Typography>
                  }
                  sx={{
                    width: "100%",
                    m: 0,
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </Paper>
            </Box>
          ))}
        </Stack>

        {allControlesChecked && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "#d1fae5",
              borderRadius: 2,
              border: "1px solid #059669",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#059669", fontWeight: 600 }}
            >
              Tous les contrôles ont été vérifiés
            </Typography>
          </Box>
        )}
      </Paper>

      <Paper sx={{ p: 3, border: "1px solid #e2e8f0" }} elevation={0}>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#1e293b" }}
        >
          Kilométrage du véhicule
        </Typography>

        <Typography variant="body2" sx={{ mb: 3, color: "#64748b" }}>
          Saisissez le kilométrage actuel du véhicule
        </Typography>

        <TextField
          fullWidth
          type="number"
          label="Kilométrage (km)"
          value={kilometrage}
          onChange={(e) => handleKilometrageChange(e.target.value)}
          disabled={disabled}
          required
          inputProps={{ min: 0 }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#e2e8f0",
              },
              "&:hover fieldset": {
                borderColor: "#2563eb",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2563eb",
              },
            },
          }}
        />
      </Paper>
    </Box>
  );
}
