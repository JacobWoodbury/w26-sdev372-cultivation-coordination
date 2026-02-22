import express from 'express';
import pool from '../connection.js';

const router = express.Router();

router.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.status(200).json({ status: 'ok', db: 'connected' });
    } catch (err) {
        console.error('Health check failed:', err.message);
        res.status(503).json({
            status: 'error',
            db: 'disconnected',
            message: err.message,
            code: err.code
        });
    }
});

export default router;
