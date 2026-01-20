// import pool from "../connection.js";

// export const getPlots = async (req, res) => {
//     try {
//         const {name, description, plants} = await pool.query('SELECT name, description, plants * FROM plots');
//         res.json({name, description, plants});
//     } catch (error) {
//         console.error('Error fetching plots:', error);
//         res.status(500).json({ error: 'error fetching plots from database' });
//     }
// }