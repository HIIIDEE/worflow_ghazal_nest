-- Manual migration to add EN_ATTENTE to WorkflowStatus enum

-- Step 1: Remove default value temporarily
ALTER TABLE workflows ALTER COLUMN statut DROP DEFAULT;

-- Step 2: Create new enum with EN_ATTENTE
CREATE TYPE "WorkflowStatus_new" AS ENUM ('EN_ATTENTE', 'EN_COURS', 'TERMINE', 'ANNULE');

-- Step 3: Convert column to new enum
ALTER TABLE workflows 
  ALTER COLUMN statut TYPE "WorkflowStatus_new" 
  USING (statut::text::"WorkflowStatus_new");

-- Step 4: Drop old enum
DROP TYPE "WorkflowStatus";

-- Step 5: Rename new enum
ALTER TYPE "WorkflowStatus_new" RENAME TO "WorkflowStatus";

-- Step 6: Set new default value
ALTER TABLE workflows ALTER COLUMN statut SET DEFAULT 'EN_ATTENTE'::"WorkflowStatus";

-- Step 7: Update existing workflows with etapeActuelle = 0 to EN_ATTENTE
UPDATE workflows 
SET statut = 'EN_ATTENTE' 
WHERE "etapeActuelle" = 0;
