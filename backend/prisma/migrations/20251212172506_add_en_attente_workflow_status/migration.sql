-- AlterEnum
ALTER TYPE "WorkflowStatus" ADD VALUE 'EN_ATTENTE';

-- AlterTable
ALTER TABLE "workflows" ALTER COLUMN "statut" SET DEFAULT 'EN_ATTENTE';
