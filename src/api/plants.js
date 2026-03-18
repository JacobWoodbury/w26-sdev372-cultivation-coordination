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

