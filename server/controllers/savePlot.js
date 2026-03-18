import pool from "../connection.js";


// expects { id?, name, description, plants }
export const savePlot = async (req, res) => {
  try {
    const plot = req.body;
    const { name, description, plants } = plot;
    const plantsValue =
      typeof plants === "string" ? plants : JSON.stringify(plants);

    if (plot.id) {
      await pool.query(
        "UPDATE plots SET name = ?, description = ?, plants = ? WHERE id = ?",
        [name, description, plantsValue, plot.id]
      );

      res.status(200).json({
        id: plot.id,
        name,
        description,
        plants,
      });
    } else {
      const [result] = await pool.query(
        "INSERT INTO plots (name, description, plants) VALUES (?, ?, ?)",
        [name, description, plantsValue]
      );

      res.status(201).json({
        id: result.insertId,
        name,
        description,
        plants,
      });
    }
  } catch (error) {
    console.error("Error saving plots:", error);
    res
      .status(500)
      .json({ error: "error saving plots to database" });
  }
};