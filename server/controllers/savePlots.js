// import pool from "../connection.js";

// we will need to decide on how we store plots before we can save them.
// export const savePlots = async (req, res) => {
//     try {
//         const plots = req.body;
//         await plots.map(async plot => {
//             await pool.query('UPDATE plots SET name = ?, description = ?, plants = ? WHERE id = ? ', [plot.name, plot.description, plot.plants, plot.id]);
//         })
//         res.json({plots});
//     } catch (error) {
//         console.error('Error saving plots:', error);
//         res.status(500).json({ error: 'error saving plots to database' });
//     }
// }