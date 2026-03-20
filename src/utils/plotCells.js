/** Empty plot cell (dirt). */
export function emptyCell() {
  return { type: "empty", label: "Dirt" };
}

/** Planted cell with optional thumbnail from Perenual details. */
export function plantCell({ plantId, commonName, thumbnailUrl }) {
  return {
    type: "plant",
    plantId: plantId ?? null,
    commonName: commonName ?? "Plant",
    thumbnailUrl: thumbnailUrl ?? null,
  };
}

/** Normalize a single cell from DB (legacy string or object). */
export function normalizeCell(cell) {
  if (cell == null) return emptyCell();
  if (typeof cell === "object" && cell.type === "empty") {
    return { type: "empty", label: cell.label ?? "Dirt" };
  }
  if (typeof cell === "object" && cell.type === "plant") {
    return plantCell({
      plantId: cell.plantId,
      commonName: cell.commonName,
      thumbnailUrl: cell.thumbnailUrl,
    });
  }
  if (typeof cell === "string") {
    if (cell === "Dirt") return emptyCell();
    return plantCell({
      plantId: null,
      commonName: cell,
      thumbnailUrl: null,
    });
  }
  return emptyCell();
}

/** Normalize full 2D plants grid when loading from API. */
export function normalizePlotPlantsGrid(plants) {
  if (!plants || !Array.isArray(plants)) return plants;
  return plants.map((row) =>
    Array.isArray(row) ? row.map(normalizeCell) : row
  );
}
