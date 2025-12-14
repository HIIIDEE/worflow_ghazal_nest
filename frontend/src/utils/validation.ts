/**
 * Validation utilities for vehicle data
 */

/**
 * Validate VIN (Vehicle Identification Number)
 * VIN must be exactly 17 characters, alphanumeric without I, O, Q
 */
export const validateVIN = (vin: string): { valid: boolean; error?: string } => {
  if (!vin) {
    return { valid: false, error: 'Le numéro de série (VIN) est obligatoire' };
  }

  if (vin.length !== 17) {
    return { valid: false, error: 'Le VIN doit contenir exactement 17 caractères' };
  }

  // VIN doesn't use I, O, Q to avoid confusion with 1, 0
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
  if (!vinRegex.test(vin)) {
    return {
      valid: false,
      error: 'Le VIN doit contenir 17 caractères alphanumériques (sans I, O, Q)',
    };
  }

  return { valid: true };
};

/**
 * Validate French license plate (immatriculation)
 * Supports both old (123 AB 12) and new (XX-123-XX) formats
 */
export const validateLicensePlate = (plate: string): { valid: boolean; error?: string } => {
  if (!plate) {
    return { valid: false, error: 'L\'immatriculation est obligatoire' };
  }

  // New format: XX-123-XX (e.g., AB-123-CD)
  const newFormatRegex = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/i;

  // Old format: 123 AB 12 or variants without spaces
  const oldFormatRegex = /^[0-9]{1,4}\s?[A-Z]{1,3}\s?[0-9]{2}$/i;

  if (!newFormatRegex.test(plate) && !oldFormatRegex.test(plate)) {
    return {
      valid: false,
      error: 'Format d\'immatriculation invalide. Formats acceptés: XX-123-XX (nouveau) ou 123 AB 12 (ancien)',
    };
  }

  return { valid: true };
};

/**
 * Validate vehicle year
 * Year must be between 1900 and current year + 1
 */
export const validateVehicleYear = (year: number): { valid: boolean; error?: string } => {
  if (!year) {
    return { valid: false, error: 'L\'année est obligatoire' };
  }

  const currentYear = new Date().getFullYear();
  const minYear = 1900;
  const maxYear = currentYear + 1;

  if (year < minYear) {
    return { valid: false, error: `L'année doit être supérieure ou égale à ${minYear}` };
  }

  if (year > maxYear) {
    return { valid: false, error: `L'année ne peut pas dépasser ${maxYear}` };
  }

  return { valid: true };
};

/**
 * Validate all vehicle fields
 */
export const validateVehicle = (vehicle: {
  immatriculation: string;
  marque: string;
  modele: string;
  annee: number;
  numeroSerie: string;
}): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  // Validate license plate
  const plateValidation = validateLicensePlate(vehicle.immatriculation);
  if (!plateValidation.valid && plateValidation.error) {
    errors.immatriculation = plateValidation.error;
  }

  // Validate marque
  if (!vehicle.marque || vehicle.marque.trim().length === 0) {
    errors.marque = 'La marque est obligatoire';
  } else if (vehicle.marque.length > 50) {
    errors.marque = 'La marque doit contenir au maximum 50 caractères';
  }

  // Validate modele
  if (!vehicle.modele || vehicle.modele.trim().length === 0) {
    errors.modele = 'Le modèle est obligatoire';
  } else if (vehicle.modele.length > 100) {
    errors.modele = 'Le modèle doit contenir au maximum 100 caractères';
  }

  // Validate year
  const yearValidation = validateVehicleYear(vehicle.annee);
  if (!yearValidation.valid && yearValidation.error) {
    errors.annee = yearValidation.error;
  }

  // Validate VIN
  const vinValidation = validateVIN(vehicle.numeroSerie);
  if (!vinValidation.valid && vinValidation.error) {
    errors.numeroSerie = vinValidation.error;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
