-- Step 1: Create new enum with EN_ATTENTE
CREATE TYPE "WorkflowStatus_new" AS ENUM ('EN_ATTENTE', 'EN_COURS', 'TERMINE', 'ANNULE');

-- Step 2: Alter column to use new enum (with USING clause to handle conversion)
ALTER TABLE workflows 
  ALTER COLUMN statut TYPE "WorkflowStatus_new" 
  USING (statut::text::"WorkflowStatus_new");

-- Step 3: Drop old enum
DROP TYPE "WorkflowStatus";

-- Step 4: Rename new enum to original name
ALTER TYPE "WorkflowStatus_new" RENAME TO "WorkflowStatus";

-- Step 5: Update existing workflows to EN_ATTENTE if etapeActuelle is 0
UPDATE workflows 
SET statut = 'EN_ATTENTE' 
WHERE "etapeActuelle" = 0 AND statut = 'EN_COURS';
