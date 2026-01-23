import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Valid config keys
const VALID_KEYS = ['siteSettings', 'contactConfig'];

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { key } = req.query;

    if (!key || !VALID_KEYS.includes(key)) {
        return res.status(400).json({
            error: 'Invalid config key',
            validKeys: VALID_KEYS
        });
    }

    try {
        // GET: Retrieve config
        if (req.method === 'GET') {
            const result = await pool.query(
                'SELECT value FROM app_config WHERE key = $1',
                [key]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Config not found', key });
            }

            return res.status(200).json(result.rows[0].value);
        }

        // POST/PUT: Save config
        if (req.method === 'POST' || req.method === 'PUT') {
            const { value } = req.body;

            if (!value) {
                return res.status(400).json({ error: 'Missing value in request body' });
            }

            await pool.query(`
        INSERT INTO app_config (key, value)
        VALUES ($1, $2)
        ON CONFLICT (key) 
        DO UPDATE SET value = $2, updated_at = NOW()
      `, [key, JSON.stringify(value)]);

            return res.status(200).json({ success: true, key });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({
            error: 'Database operation failed',
            message: error.message
        });
    }
}
