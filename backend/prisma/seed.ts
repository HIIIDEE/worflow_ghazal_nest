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

    // Créer les étapes génériques pour les étapes 2-10 si elles n'existent pas
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
