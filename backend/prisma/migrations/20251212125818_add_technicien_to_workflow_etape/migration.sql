-- AlterTable
ALTER TABLE "workflow_etapes" ADD COLUMN     "technicienId" TEXT;

-- AddForeignKey
ALTER TABLE "workflow_etapes" ADD CONSTRAINT "workflow_etapes_technicienId_fkey" FOREIGN KEY ("technicienId") REFERENCES "techniciens"("id") ON DELETE SET NULL ON UPDATE CASCADE;
