import { PrismaService } from '../prisma.service';
import { PermissionType } from '../common/enums/permission-type.enum';
export declare class EtapeDefinitionsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        permissions: ({
            user: {
                id: string;
                email: string | null;
                nom: string;
                prenom: string;
                role: import("@prisma/client").$Enums.UserRole;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            etapeDefinitionId: string;
            userId: string;
            permissionType: import("@prisma/client").$Enums.PermissionType;
        })[];
    } & {
        id: string;
        nom: string;
        createdAt: Date;
        updatedAt: Date;
        numeroEtape: number;
        description: string | null;
        champsFormulaire: import("@prisma/client/runtime/client").JsonValue | null;
        ordre: number;
        estObligatoire: boolean;
    })[]>;
    findOneByNumero(numeroEtape: number): Promise<({
        permissions: ({
            user: {
                id: string;
                email: string | null;
                nom: string;
                prenom: string;
                role: import("@prisma/client").$Enums.UserRole;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            etapeDefinitionId: string;
            userId: string;
            permissionType: import("@prisma/client").$Enums.PermissionType;
        })[];
    } & {
        id: string;
        nom: string;
        createdAt: Date;
        updatedAt: Date;
        numeroEtape: number;
        description: string | null;
        champsFormulaire: import("@prisma/client/runtime/client").JsonValue | null;
        ordre: number;
        estObligatoire: boolean;
    }) | null>;
    updatePermissions(numeroEtape: number, permissions: {
        userId: string;
        permissionType: PermissionType;
    }[]): Promise<({
        permissions: ({
            user: {
                id: string;
                email: string | null;
                nom: string;
                prenom: string;
                role: import("@prisma/client").$Enums.UserRole;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            etapeDefinitionId: string;
            userId: string;
            permissionType: import("@prisma/client").$Enums.PermissionType;
        })[];
    } & {
        id: string;
        nom: string;
        createdAt: Date;
        updatedAt: Date;
        numeroEtape: number;
        description: string | null;
        champsFormulaire: import("@prisma/client/runtime/client").JsonValue | null;
        ordre: number;
        estObligatoire: boolean;
    }) | null>;
    getUserPermissionsForEtape(userId: string, numeroEtape: number): Promise<PermissionType[]>;
    getUserPermissionsForAllEtapes(userId: string): Promise<Record<number, PermissionType[]>>;
}
