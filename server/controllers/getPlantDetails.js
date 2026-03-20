import pool from "../connection.js";

const PERENUAL_DETAILS_BASE =
  "https://perenual.com/api/v2/species/details";

export const getPlantDetails = async (req, res) => {
  try {
    const perenualApiKey = process.env.PERENUAL_API_KEY;
    const localId = Number(req.params.id);
    if (!Number.isFinite(localId)) {
      return res.status(400).json({ error: "invalid plant id" });
    }

    const [rows] = await pool.query(
      "SELECT id, common_name, scientific_name, perenual_id FROM plants WHERE id = ?",
      [localId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "plant not found" });
    }

    const row = rows[0];
    if (row.perenual_id == null) {
      return res.status(422).json({
        error: "plant has no perenual_id",
        id: row.id,
        common_name: row.common_name,
      });
    }

    if (!perenualApiKey) {
      return res.status(503).json({ error: "Perenual API key not configured" });
    }

    const url = `${PERENUAL_DETAILS_BASE}/${row.perenual_id}?key=${encodeURIComponent(perenualApiKey)}`;
    const perRes = await fetch(url);
    const json = await perRes.json().catch(() => null);

    if (!perRes.ok) {
      return res.status(502).json({
        error: "Perenual details request failed",
        status: perRes.status,
        body: json,
      });
    }

    const thumb =
      json?.default_image?.thumbnail ??
      json?.default_image?.small_url ??
      json?.default_image?.medium_url ??
      null;

    res.status(200).json({
      id: row.id,
      common_name: json?.common_name ?? row.common_name,
      scientific_name: json?.scientific_name ?? row.scientific_name,
      perenual_id: row.perenual_id,
      thumbnailUrl: thumb,
      default_image: json?.default_image ?? null,
    });
  } catch (error) {
    console.error("Error fetching plant details:", error);
    res.status(500).json({ error: "error fetching plant details" });
  }
};
