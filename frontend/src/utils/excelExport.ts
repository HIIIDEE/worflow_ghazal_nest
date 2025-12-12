import * as XLSX from 'xlsx';
import type { Workflow } from '../features/workflows/types';
import { formatDuration } from './formatDuration';

export function exportWorkflowsToExcel(workflows: Workflow[]) {
    // Préparer les données pour Excel
    const data = workflows.map(workflow => ({
        'Véhicule': `${workflow.vehicle?.marque || ''} ${workflow.vehicle?.modele || ''}`.trim(),
        'Immatriculation': workflow.vehicle?.immatriculation || '',
        'VIN': workflow.vehicle?.numeroSerie || '',
        'Statut': workflow.statut,
        'Étape Actuelle': `${workflow.etapeActuelle}/10`,
        'Date de Début': new Date(workflow.dateDebut).toLocaleDateString('fr-FR'),
        'Date de Fin': workflow.dateFin ? new Date(workflow.dateFin).toLocaleDateString('fr-FR') : '',
        'Durée': workflow.statut === 'TERMINE' ? formatDuration(workflow.duration ?? null) : 'En cours',
    }));

    // Créer une feuille de calcul
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Définir la largeur des colonnes
    const columnWidths = [
        { wch: 20 }, // Véhicule
        { wch: 15 }, // Immatriculation
        { wch: 20 }, // VIN
        { wch: 12 }, // Statut
        { wch: 15 }, // Étape Actuelle
        { wch: 15 }, // Date de Début
        { wch: 15 }, // Date de Fin
        { wch: 12 }, // Durée
    ];
    worksheet['!cols'] = columnWidths;

    // Créer un classeur
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Workflows');

    // Générer le fichier Excel
    const fileName = `workflows_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
}
