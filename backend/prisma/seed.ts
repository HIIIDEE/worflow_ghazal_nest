import { PrismaClient, UserRole, PermissionType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

// Configuration de la connexion PostgreSQL
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:123456@127.0.0.1:5433/workflow?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
                role: UserRole.ADMIN,
                isActive: true,
            },
        });
        console.log(`✅ Utilisateur admin créé avec succès!`);
        console.log(`   Email: ${adminEmail}`);
        console.log(`   Mot de passe: admin123`);
    } else {
        console.log('ℹ️  L\'utilisateur admin existe déjà.');
    }

    // Seed des 10 étapes de workflow par défaut
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
            nom: 'Demontage',
            description: 'Demontage des elements necessaires pour l\'installation GPL',
            champsFormulaire: {}
        },
        {
            numeroEtape: 3,
            nom: 'Fixation Reservoir',
            description: 'Installation et fixation du reservoir GPL',
            champsFormulaire: {}
        },
        {
            numeroEtape: 4,
            nom: 'Compartiment Moteur',
            description: 'Installation des composants dans le compartiment moteur',
            champsFormulaire: {}
        },
        {
            numeroEtape: 5,
            nom: 'Raccordement',
            description: 'Raccordement des tuyaux et connexions',
            champsFormulaire: {}
        },
        {
            numeroEtape: 6,
            nom: 'Finition',
            description: 'Finitions et remontage des elements',
            champsFormulaire: {}
        },
        {
            numeroEtape: 7,
            nom: 'Verification avant controle',
            description: 'Verifications avant le controle final',
            champsFormulaire: {}
        },
        {
            numeroEtape: 8,
            nom: 'Controle Final',
            description: 'Controle complet de tous les composants',
            champsFormulaire: {}
        },
        {
            numeroEtape: 9,
            nom: 'Test d\'Etancheite',
            description: 'Test d\'etancheite de l\'installation',
            champsFormulaire: {}
        },
        {
            numeroEtape: 10,
            nom: 'Test sur Route',
            description: 'Test sur route et validation finale',
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
        } else {
            // Mise à jour de la définition existante
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

    // Seed des permissions de test pour l'admin
    console.log('🌱 Configuration des permissions pour l\'admin...');

    const admin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });

    if (admin) {
        const allEtapes = await prisma.etapeDefinition.findMany();
        const allPermissions = [
            PermissionType.VIEW,
            PermissionType.START,
            PermissionType.EDIT,
            PermissionType.VALIDATE,
            PermissionType.EDIT_COMPLETED,
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
                } else {
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
