import pool from "../connection.js";

export const deletePlot = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "invalid plot id" });
    }

    const [result] = await pool.query("DELETE FROM plots WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "plot not found" });
    }

    res.status(200).json({ ok: true, id });
  } catch (error) {
    console.error("Error deleting plot:", error);
    res.status(500).json({ error: "error deleting plot from database" });
  }
};

