-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'GESTIONNAIRE');

-- CreateEnum
CREATE TYPE "WorkflowStatus" AS ENUM ('EN_ATTENTE', 'EN_COURS', 'TERMINE', 'ANNULE');

-- CreateEnum
CREATE TYPE "EtapeStatus" AS ENUM ('EN_ATTENTE', 'EN_COURS', 'TERMINE', 'BLOQUE');

-- CreateEnum
CREATE TYPE "PermissionType" AS ENUM ('VIEW', 'START', 'EDIT', 'VALIDATE', 'EDIT_COMPLETED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'GESTIONNAIRE',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "techniciens" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "telephone" TEXT,
    "email" TEXT,
    "specialite" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "techniciens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "immatriculation" TEXT NOT NULL,
    "marque" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "annee" INTEGER NOT NULL,
    "numeroSerie" TEXT NOT NULL,
    "creePar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflows" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "statut" "WorkflowStatus" NOT NULL DEFAULT 'EN_ATTENTE',
    "etapeActuelle" INTEGER NOT NULL DEFAULT 0,
    "dateDebut" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateFin" TIMESTAMP(3),
    "raisonAnnulation" TEXT,
    "dateAnnulation" TIMESTAMP(3),
    "annulePar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workflows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_etapes" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "numeroEtape" INTEGER NOT NULL,
    "nomEtape" TEXT NOT NULL,
    "description" TEXT,
    "statut" "EtapeStatus" NOT NULL DEFAULT 'EN_ATTENTE',
    "formulaire" JSONB,
    "dateDebut" TIMESTAMP(3),
    "dateFin" TIMESTAMP(3),
    "validePar" TEXT,
    "valideParId" TEXT,
    "technicienId" TEXT,
    "signatureGestionnaire" TEXT,
    "signatureTechnicien" TEXT,
    "commentaires" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workflow_etapes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etape_definitions" (
    "id" TEXT NOT NULL,
    "numeroEtape" INTEGER NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "champsFormulaire" JSONB,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "estObligatoire" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "etape_definitions_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "historique_modifications" (
    "id" TEXT NOT NULL,
    "entite" TEXT NOT NULL,
    "entiteId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "modifiePar" TEXT NOT NULL,
    "dateModification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "anciennesValeurs" JSONB,
    "nouvellesValeurs" JSONB,
    "commentaire" TEXT,

    CONSTRAINT "historique_modifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_immatriculation_key" ON "vehicles"("immatriculation");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_numeroSerie_key" ON "vehicles"("numeroSerie");

-- CreateIndex
CREATE INDEX "vehicles_marque_idx" ON "vehicles"("marque");

-- CreateIndex
CREATE INDEX "vehicles_modele_idx" ON "vehicles"("modele");

-- CreateIndex
CREATE INDEX "vehicles_annee_idx" ON "vehicles"("annee");

-- CreateIndex
CREATE INDEX "vehicles_createdAt_idx" ON "vehicles"("createdAt");

-- CreateIndex
CREATE INDEX "vehicles_immatriculation_numeroSerie_idx" ON "vehicles"("immatriculation", "numeroSerie");

-- CreateIndex
CREATE INDEX "workflows_statut_idx" ON "workflows"("statut");

-- CreateIndex
CREATE INDEX "workflows_etapeActuelle_idx" ON "workflows"("etapeActuelle");

-- CreateIndex
CREATE INDEX "workflows_vehicleId_idx" ON "workflows"("vehicleId");

-- CreateIndex
CREATE INDEX "workflows_dateDebut_idx" ON "workflows"("dateDebut");

-- CreateIndex
CREATE INDEX "workflows_createdAt_idx" ON "workflows"("createdAt");

-- CreateIndex
CREATE INDEX "workflows_statut_createdAt_idx" ON "workflows"("statut", "createdAt");

-- CreateIndex
CREATE INDEX "workflow_etapes_workflowId_idx" ON "workflow_etapes"("workflowId");

-- CreateIndex
CREATE INDEX "workflow_etapes_statut_idx" ON "workflow_etapes"("statut");

-- CreateIndex
CREATE INDEX "workflow_etapes_numeroEtape_idx" ON "workflow_etapes"("numeroEtape");

-- CreateIndex
CREATE INDEX "workflow_etapes_valideParId_idx" ON "workflow_etapes"("valideParId");

-- CreateIndex
CREATE INDEX "workflow_etapes_technicienId_idx" ON "workflow_etapes"("technicienId");

-- CreateIndex
CREATE UNIQUE INDEX "workflow_etapes_workflowId_numeroEtape_key" ON "workflow_etapes"("workflowId", "numeroEtape");

-- CreateIndex
CREATE UNIQUE INDEX "etape_definitions_numeroEtape_key" ON "etape_definitions"("numeroEtape");

-- CreateIndex
CREATE INDEX "etape_permissions_userId_etapeDefinitionId_idx" ON "etape_permissions"("userId", "etapeDefinitionId");

-- CreateIndex
CREATE INDEX "etape_permissions_permissionType_idx" ON "etape_permissions"("permissionType");

-- CreateIndex
CREATE UNIQUE INDEX "etape_permissions_etapeDefinitionId_userId_permissionType_key" ON "etape_permissions"("etapeDefinitionId", "userId", "permissionType");

-- CreateIndex
CREATE INDEX "historique_modifications_entiteId_idx" ON "historique_modifications"("entiteId");

-- CreateIndex
CREATE INDEX "historique_modifications_entite_idx" ON "historique_modifications"("entite");

-- CreateIndex
CREATE INDEX "historique_modifications_dateModification_idx" ON "historique_modifications"("dateModification");

-- CreateIndex
CREATE INDEX "historique_modifications_modifiePar_idx" ON "historique_modifications"("modifiePar");

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_etapes" ADD CONSTRAINT "workflow_etapes_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_etapes" ADD CONSTRAINT "workflow_etapes_valideParId_fkey" FOREIGN KEY ("valideParId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_etapes" ADD CONSTRAINT "workflow_etapes_technicienId_fkey" FOREIGN KEY ("technicienId") REFERENCES "techniciens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etape_permissions" ADD CONSTRAINT "etape_permissions_etapeDefinitionId_fkey" FOREIGN KEY ("etapeDefinitionId") REFERENCES "etape_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etape_permissions" ADD CONSTRAINT "etape_permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
