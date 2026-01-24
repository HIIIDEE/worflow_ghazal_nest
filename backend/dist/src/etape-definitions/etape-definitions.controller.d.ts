import { EtapeDefinitionsService } from './etape-definitions.service';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
export declare class EtapeDefinitionsController {
    private readonly etapeDefinitionsService;
    constructor(etapeDefinitionsService: EtapeDefinitionsService);
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
    findOne(numeroEtape: string): Promise<({
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
    updatePermissions(numeroEtape: string, updatePermissionsDto: UpdatePermissionsDto): Promise<({
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
    getUserPermissions(numeroEtape: string, user: any): Promise<import("@prisma/client").$Enums.PermissionType[]>;
}
