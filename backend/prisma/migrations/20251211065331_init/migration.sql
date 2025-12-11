-- CreateEnum
CREATE TYPE "WorkflowStatus" AS ENUM ('EN_COURS', 'TERMINE', 'ANNULE');

-- CreateEnum
CREATE TYPE "EtapeStatus" AS ENUM ('EN_ATTENTE', 'EN_COURS', 'TERMINE', 'BLOQUE');

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "immatriculation" TEXT NOT NULL,
    "marque" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "annee" INTEGER NOT NULL,
    "numeroSerie" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "adresse" TEXT,
    "ville" TEXT,
    "codePostal" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflows" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "statut" "WorkflowStatus" NOT NULL DEFAULT 'EN_COURS',
    "etapeActuelle" INTEGER NOT NULL DEFAULT 1,
    "dateDebut" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateFin" TIMESTAMP(3),
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
CREATE UNIQUE INDEX "vehicles_immatriculation_key" ON "vehicles"("immatriculation");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_numeroSerie_key" ON "vehicles"("numeroSerie");

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "workflow_etapes_workflowId_numeroEtape_key" ON "workflow_etapes"("workflowId", "numeroEtape");

-- CreateIndex
CREATE UNIQUE INDEX "etape_definitions_numeroEtape_key" ON "etape_definitions"("numeroEtape");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_etapes" ADD CONSTRAINT "workflow_etapes_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;
