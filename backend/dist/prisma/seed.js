"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const bcrypt = __importStar(require("bcrypt"));
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:123456@127.0.0.1:5433/workflow?schema=public';
const pool = new pg_1.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('🌱 Démarrage du seed...');
    const adminEmail = 'admin@ghazal.com';
    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                nom: 'Admin',
                prenom: 'System',
                role: client_1.UserRole.ADMIN,
                isActive: true,
            },
        });
        console.log(`✅ Utilisateur admin créé avec succès!`);
        console.log(`   Email: ${adminEmail}`);
        console.log(`   Mot de passe: admin123`);
    }
    else {
        console.log('ℹ️  L\'utilisateur admin existe déjà.');
    }
    console.log('🌱 Vérification des définitions d\'étapes...');
    const etapesDefinitions = [
        {
            numeroEtape: 1,
            nom: 'Réception du véhicule',
            description: 'Vérification initiale et réception du véhicule',
            champsFormulaire: {
                controles: [
                    'État extérieur du véhicule',
                    'État intérieur du véhicule',
                    'Niveau liquide de refroidissement est-il au <<Min>>',
                    'Niveau liquide de refroidissement est-il au <<Max>>',
                    'Niveau carburant est-il suffisant pour déplacement véhicule'
                ],
                champs: [
                    { nom: 'kilometrage', label: 'Kilométrage (km) du véhicule', type: 'number', required: true }
                ]
            }
        }
    ];
    for (const etapeDef of etapesDefinitions) {
        const etape = await prisma.etapeDefinition.findUnique({
            where: { numeroEtape: etapeDef.numeroEtape },
        });
        if (!etape) {
            await prisma.etapeDefinition.create({
                data: {
                    ...etapeDef,
                    ordre: etapeDef.numeroEtape,
                    estObligatoire: true,
                },
            });
            console.log(`✅ Définition d'étape créée: ${etapeDef.nom}`);
        }
        else {
            await prisma.etapeDefinition.update({
                where: { numeroEtape: etapeDef.numeroEtape },
                data: {
                    nom: etapeDef.nom,
                    description: etapeDef.description,
                    champsFormulaire: etapeDef.champsFormulaire,
                },
            });
            console.log(`✅ Définition d'étape mise à jour: ${etapeDef.nom}`);
        }
    }
    for (let i = 2; i <= 10; i++) {
        const etape = await prisma.etapeDefinition.findUnique({
            where: { numeroEtape: i },
        });
        if (!etape) {
            await prisma.etapeDefinition.create({
                data: {
                    numeroEtape: i,
                    nom: `Étape ${i}`,
                    description: `Description générique pour l'étape ${i}. À configurer.`,
                    ordre: i,
                    estObligatoire: true,
                    champsFormulaire: {},
                },
            });
            console.log(`✅ Définition d'étape créée: Étape ${i}`);
        }
    }
    console.log('✅ Vérification des étapes terminée.');
    console.log('🌱 Configuration des permissions pour l\'admin...');
    const admin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });
    if (admin) {
        const allEtapes = await prisma.etapeDefinition.findMany();
        const allPermissions = [
            client_1.PermissionType.VIEW,
            client_1.PermissionType.START,
            client_1.PermissionType.EDIT,
            client_1.PermissionType.VALIDATE,
            client_1.PermissionType.EDIT_COMPLETED,
        ];
        let permissionsCreated = 0;
        let permissionsExisting = 0;
        for (const etape of allEtapes) {
            for (const permType of allPermissions) {
                const existingPerm = await prisma.etapePermission.findUnique({
                    where: {
                        etapeDefinitionId_userId_permissionType: {
                            etapeDefinitionId: etape.id,
                            userId: admin.id,
                            permissionType: permType,
                        },
                    },
                });
                if (!existingPerm) {
                    await prisma.etapePermission.create({
                        data: {
                            etapeDefinitionId: etape.id,
                            userId: admin.id,
                            permissionType: permType,
                        },
                    });
                    permissionsCreated++;
                }
                else {
                    permissionsExisting++;
                }
            }
        }
        console.log(`✅ Permissions configurées pour l'admin:`);
        console.log(`   - ${permissionsCreated} permissions créées`);
        console.log(`   - ${permissionsExisting} permissions déjà existantes`);
    }
    console.log('✅ Seed terminé avec succès!');
}
main()
    .catch((e) => {
    console.error('❌ Erreur lors du seed:', e.message);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
});
//# sourceMappingURL=seed.js.map