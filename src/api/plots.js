import { apiUrl } from "./api";

export async function fetchPlots() {
    const response = await fetch(apiUrl('/api/plots'));

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw errorBody ?? new Error('Failed to fetch plots');
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
}

export async function savePlot(plot) {
    const response = await fetch(apiUrl('/api/plots'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plot),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw errorBody ?? new Error('Failed to save plot');
    }

    return await response.json();
}

export async function deletePlot(id) {
    const response = await fetch(apiUrl(`/api/plots/${id}`), { method: 'DELETE' });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw errorBody ?? new Error('Failed to delete plot');
    }

    return await response.json();
}
