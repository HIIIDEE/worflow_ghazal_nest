export const PermissionType = {
  VIEW: 'VIEW',
  START: 'START',
  EDIT: 'EDIT',
  VALIDATE: 'VALIDATE',
  EDIT_COMPLETED: 'EDIT_COMPLETED',
} as const;

export type PermissionType = typeof PermissionType[keyof typeof PermissionType];

export interface EtapePermission {
  id: string;
  etapeDefinitionId: string;
  userId: string;
  permissionType: PermissionType;
  user: {
    id: string;
    email: string;
    nom: string;
    prenom: string;
    role: string;
  };
}

export interface EtapeDefinition {
  id: string;
  numeroEtape: number;
  nom: string;
  description?: string;
  champsFormulaire?: any;
  ordre: number;
  estObligatoire: boolean;
  permissions?: EtapePermission[];
}

export interface UserPermissions {
  [numeroEtape: number]: PermissionType[];
}
