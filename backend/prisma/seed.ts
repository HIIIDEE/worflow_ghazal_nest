import { PrismaClient, UserRole } from '@prisma/client';
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
    for (let i = 1; i <= 10; i++) {
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
                    champsFormulaire: {}, // Formulaire vide par défaut
                },
            });
            console.log(`✅ Définition d'étape créée: Étape ${i}`);
        }
    }
    console.log('✅ Vérification des étapes terminée.');
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
