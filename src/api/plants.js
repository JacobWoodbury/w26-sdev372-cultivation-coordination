import { apiUrl } from "./api";

export async function fetchPlants() {
  const response = await fetch(apiUrl("/api/plants"));

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw errorBody ?? new Error('Failed to fetch plants');
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

/** Local DB plant id → Perenual-backed details + thumbnail (via backend proxy). */
export async function fetchPlantDetailsById(localPlantId) {
  const response = await fetch(
    apiUrl(`/api/plants/${localPlantId}/details`)
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw errorBody ?? new Error("Failed to fetch plant details");
  }

  return await response.json();
}

