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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres123@localhost:5432/workflow?schema=public';
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
    console.log('🌱 Vérification des utilisateurs techniciens...');
    const sampleTechnicians = [
        {
            code: '101',
            nom: 'Benali',
            prenom: 'Ahmed',
            role: client_1.UserRole.TECHNICIEN,
            telephone: '+213 555 12 34 56',
            specialite: 'Installation GPL',
            isActive: true,
        },
        {
            code: '102',
            nom: 'Meziane',
            prenom: 'Karim',
            role: client_1.UserRole.TECHNICIEN,
            telephone: '+213 555 98 76 54',
            specialite: 'Contrôle qualité',
            isActive: true,
        },
        {
            code: '201',
            nom: 'Hadj',
            prenom: 'Fatima',
            role: client_1.UserRole.CONTROLEUR,
            telephone: '+213 555 11 22 33',
            specialite: 'Contrôle technique',
            isActive: true,
        },
    ];
    for (const techData of sampleTechnicians) {
        const existing = await prisma.user.findUnique({
            where: { code: techData.code },
        });
        if (!existing) {
            await prisma.user.create({
                data: techData,
            });
            console.log(`✅ Utilisateur ${techData.role} créé avec code: ${techData.code}`);
        }
        else {
            console.log(`ℹ️  L'utilisateur avec code ${techData.code} existe déjà.`);
        }
    }
    console.log('🌱 Vérification des définitions d\'étapes...');
    const etapesDefinitions = [
        {
            numeroEtape: 1,
            nom: 'Reception',
            description: 'Inspection visuelle, controles de reception et releve du kilometrage',
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
        },
        {
            numeroEtape: 2,
            nom: 'Poste 0 - Démontage',
            description: 'Demontage des elements necessaires pour l\'installation GPL',
            champsFormulaire: {}
        },
        {
            numeroEtape: 3,
            nom: 'Poste 1 - Partie Arrière - Fixation Réservoir',
            description: 'Fixation du réservoir à l\'arrière du véhicule',
            champsFormulaire: {}
        },
        {
            numeroEtape: 4,
            nom: 'Poste 1 - Partie Garde-boue',
            description: 'Installation du détendeur et du garde-boue',
            champsFormulaire: {}
        },
        {
            numeroEtape: 5,
            nom: 'Poste 1 - Partie Moteur',
            description: 'Installation des éléments au niveau du moteur',
            champsFormulaire: {}
        },
        {
            numeroEtape: 6,
            nom: 'Poste 2 - Compartiment Moteur',
            description: 'Installation des composants dans le compartiment moteur',
            champsFormulaire: {}
        },
        {
            numeroEtape: 7,
            nom: 'Poste 3 - Montage réservoir',
            description: 'Fixation et raccordement du réservoir',
            champsFormulaire: {}
        },
        {
            numeroEtape: 8,
            nom: 'Poste 3 - Passage du tuyau HP Ø6',
            description: 'Passage et raccordement du tuyau haute pression Ø6',
            champsFormulaire: {}
        },
        {
            numeroEtape: 9,
            nom: 'Poste 4 - Arrière',
            description: 'Installation des éléments à l\'arrière du véhicule',
            champsFormulaire: {}
        },
        {
            numeroEtape: 10,
            nom: 'Poste 4 - Centrale GPL',
            description: 'Installation de la centrale GPL et du commutateur',
            champsFormulaire: {}
        },
        {
            numeroEtape: 11,
            nom: 'Poste 4 - Faisceaux électriques',
            description: 'Installation des faisceaux électriques',
            champsFormulaire: {}
        },
        {
            numeroEtape: 12,
            nom: 'Poste 5 - Verification avant controle',
            description: 'Verifications avant le controle final - Test d\'étanchéité, fonctionnement moteur et liquide de refroidissement',
            champsFormulaire: {}
        },
        {
            numeroEtape: 13,
            nom: 'Poste 6 - Controle Final - Partie Moteur',
            description: 'Controle complet de tous les composants moteur - Carrosserie, Détendeur, Électrovanne, Rail injecteurs, Filtre à gaz, Capteur de pression, Centrale, Branchement batterie, Commutateur et Fonctionnement moteur',
            champsFormulaire: {}
        },
        {
            numeroEtape: 14,
            nom: 'Poste 7 - Controle Final Carrosserie et Sous Caisse',
            description: 'Controle final de la carrosserie, sous caisse, tuyauterie HP et fonctionnement moteur',
            champsFormulaire: {}
        },
        {
            numeroEtape: 15,
            nom: 'Approvisionnement et Controle du Vehicule au GPL',
            description: 'Test d\'étanchéité, test sur route, approvisionnement au GPL et passage en mode GPL',
            champsFormulaire: {}
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