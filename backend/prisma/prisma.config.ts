// Configuration Prisma 7 pour les commandes CLI (migrate, db push, etc.)
export default {
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://postgres:postgres123@postgres:5432/workflow?schema=public'
    }
  }
};
