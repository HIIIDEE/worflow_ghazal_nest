import { useQuery } from '@tanstack/react-query';
import { workflowsApi } from '../features/workflows/services/workflows.api';
import { PermissionType } from '../types/permissions';

/**
 * Hook principal pour récupérer les permissions d'un utilisateur pour toutes les étapes d'un workflow
 */
export function useEtapePermissions(workflowId: string | undefined) {
  return useQuery({
    queryKey: ['workflow-permissions', workflowId],
    queryFn: async () => {
      if (!workflowId) throw new Error('Workflow ID is required');
      const response = await workflowsApi.getUserPermissions(workflowId);
      return response.data;
    },
    enabled: !!workflowId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Vérifie si l'utilisateur peut voir une étape
 * Les ADMINs peuvent toujours voir toutes les étapes
 */
export function useCanViewEtape(
  permissions: { [key: number]: string[] } | undefined,
  numeroEtape: number,
  userRole: string | undefined,
): boolean {
  // ADMIN bypass
  if (userRole === 'ADMIN') return true;

  // Pas de permissions = pas d'accès
  if (!permissions || !permissions[numeroEtape]) return false;

  // Vérifier si l'utilisateur a la permission VIEW
  return permissions[numeroEtape].includes(PermissionType.VIEW);
}

/**
 * Vérifie si l'utilisateur peut démarrer une étape (EN_ATTENTE → EN_COURS)
 * Les ADMINs peuvent toujours démarrer toutes les étapes
 */
export function useCanStartEtape(
  permissions: { [key: number]: string[] } | undefined,
  numeroEtape: number,
  userRole: string | undefined,
): boolean {
  // ADMIN bypass
  if (userRole === 'ADMIN') return true;

  // Pas de permissions = pas d'accès
  if (!permissions || !permissions[numeroEtape]) return false;

  // Vérifier si l'utilisateur a la permission START
  return permissions[numeroEtape].includes(PermissionType.START);
}

/**
 * Vérifie si l'utilisateur peut modifier une étape
 * - Pour les étapes non terminées : besoin de EDIT
 * - Pour les étapes terminées : besoin de EDIT_COMPLETED
 * Les ADMINs peuvent toujours modifier toutes les étapes
 */
export function useCanEditEtape(
  permissions: { [key: number]: string[] } | undefined,
  numeroEtape: number,
  statut: string | undefined,
  userRole: string | undefined,
): boolean {
  // ADMIN bypass
  if (userRole === 'ADMIN') return true;

  // Pas de permissions = pas d'accès
  if (!permissions || !permissions[numeroEtape]) return false;

  const userPermissions = permissions[numeroEtape];

  // Si l'étape est terminée, vérifier EDIT_COMPLETED
  if (statut === 'TERMINE') {
    return userPermissions.includes(PermissionType.EDIT_COMPLETED);
  }

  // Sinon, vérifier EDIT
  return userPermissions.includes(PermissionType.EDIT);
}

/**
 * Vérifie si l'utilisateur peut valider/terminer une étape (→ TERMINE)
 * Les ADMINs peuvent toujours valider toutes les étapes
 */
export function useCanValidateEtape(
  permissions: { [key: number]: string[] } | undefined,
  numeroEtape: number,
  userRole: string | undefined,
): boolean {
  // ADMIN bypass
  if (userRole === 'ADMIN') return true;

  // Pas de permissions = pas d'accès
  if (!permissions || !permissions[numeroEtape]) return false;

  // Vérifier si l'utilisateur a la permission VALIDATE
  return permissions[numeroEtape].includes(PermissionType.VALIDATE);
}
