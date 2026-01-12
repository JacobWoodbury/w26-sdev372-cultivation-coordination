import pool from '../connection.js';

export const getPlants = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM plants');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching plants:', error);
        res.status(500).json({ message: 'Error fetching plants from database' });
    }
};
