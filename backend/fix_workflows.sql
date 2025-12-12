-- Fix existing workflows: set etapeActuelle to 0 if step 1 is still EN_ATTENTE
UPDATE workflows w
SET "etapeActuelle" = 0
WHERE w."etapeActuelle" = 1
AND EXISTS (
  SELECT 1 FROM workflow_etapes we
  WHERE we."workflowId" = w.id
  AND we."numeroEtape" = 1
  AND we.statut = 'EN_ATTENTE'
);
