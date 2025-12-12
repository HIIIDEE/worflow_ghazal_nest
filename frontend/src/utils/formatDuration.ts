// Helper function to format duration in milliseconds to human-readable format
export function formatDuration(milliseconds: number | null): string {
    if (!milliseconds) return 'N/A';

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
