-- CreateEnum
CREATE TYPE "PermissionType" AS ENUM ('VIEW', 'START', 'EDIT', 'VALIDATE', 'EDIT_COMPLETED');

-- AlterTable
ALTER TABLE "workflow_etapes" ADD COLUMN     "valideParId" TEXT;

-- CreateTable
CREATE TABLE "etape_permissions" (
    "id" TEXT NOT NULL,
    "etapeDefinitionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "permissionType" "PermissionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "etape_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "etape_permissions_userId_etapeDefinitionId_idx" ON "etape_permissions"("userId", "etapeDefinitionId");

-- CreateIndex
CREATE INDEX "etape_permissions_permissionType_idx" ON "etape_permissions"("permissionType");

-- CreateIndex
CREATE UNIQUE INDEX "etape_permissions_etapeDefinitionId_userId_permissionType_key" ON "etape_permissions"("etapeDefinitionId", "userId", "permissionType");

-- AddForeignKey
ALTER TABLE "workflow_etapes" ADD CONSTRAINT "workflow_etapes_valideParId_fkey" FOREIGN KEY ("valideParId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etape_permissions" ADD CONSTRAINT "etape_permissions_etapeDefinitionId_fkey" FOREIGN KEY ("etapeDefinitionId") REFERENCES "etape_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etape_permissions" ADD CONSTRAINT "etape_permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
