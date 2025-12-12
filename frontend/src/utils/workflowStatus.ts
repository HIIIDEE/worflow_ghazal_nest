// Helper functions for workflow status display

export function getWorkflowDuration(statut: string, duration: number | null | undefined): string {
    switch (statut) {
        case 'EN_ATTENTE':
            return 'Pas encore débuté';
        case 'TERMINE':
            return duration ? formatDurationValue(duration) : 'N/A';
        case 'EN_COURS':
            return 'En cours';
        case 'ANNULE':
            return 'Annulé';
        default:
            return 'N/A';
    }
}

function formatDurationValue(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        const remainingHours = hours % 24;
        return remainingHours > 0 ? `${days}j ${remainingHours}h` : `${days}j`;
    }

    if (hours > 0) {
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }

    if (minutes > 0) {
        return `${minutes}m`;
    }

    return `${seconds}s`;
}

export function getStatutColor(statut: string): string {
    switch (statut) {
        case 'EN_ATTENTE':
            return '#6366f1'; // indigo-500
        case 'EN_COURS':
            return '#eab308'; // yellow-600
        case 'TERMINE':
            return '#22c55e'; // green-500
        case 'ANNULE':
            return '#ef4444'; // red-500
        default:
            return '#94a3b8'; // slate-400
    }
}

export function getStatutBg(statut: string): string {
    switch (statut) {
        case 'EN_ATTENTE':
            return '#e0e7ff'; // indigo-100
        case 'EN_COURS':
            return '#fef9c3'; // yellow-100
        case 'TERMINE':
            return '#dcfce7'; // green-100
        case 'ANNULE':
            return '#fee2e2'; // red-100
        default:
            return '#f1f5f9'; // slate-100
    }
}

export function getStatutLabel(statut: string): string {
    switch (statut) {
        case 'EN_ATTENTE':
            return 'En Attente';
        case 'EN_COURS':
            return 'En Cours';
        case 'TERMINE':
            return 'Terminé';
        case 'ANNULE':
            return 'Annulé';
        case 'BLOQUE':
            return 'Bloqué';
        default:
            return statut;
    }
}

// Helper function for step duration (similar to workflow duration but for individual steps)
export function getStepDuration(statut: string, duration: number | null | undefined): string {
    switch (statut) {
        case 'EN_ATTENTE':
            return 'Pas encore débuté';
        case 'TERMINE':
            return duration ? formatDurationValue(duration) : 'N/A';
        case 'EN_COURS':
            return 'En cours';
        case 'BLOQUE':
            return 'Bloqué';
        default:
            return 'N/A';
    }
}
