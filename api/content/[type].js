import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Valid content types that can be accessed
const VALID_TYPES = [
    'wings', 'team', 'timeline', 'partnerships', 'projects',
    'techStack', 'roadmap', 'homeContent', 'companyContent', 'innovationContent'
];

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Extract content type from URL
    const { type } = req.query;

    if (!type || !VALID_TYPES.includes(type)) {
        return res.status(400).json({
            error: 'Invalid content type',
            validTypes: VALID_TYPES
        });
    }

    try {
        // GET: Retrieve content
        if (req.method === 'GET') {
            const result = await pool.query(
                'SELECT data FROM app_content WHERE entity_type = $1',
                [type]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Content not found', type });
            }

            return res.status(200).json(result.rows[0].data);
        }

        // POST/PUT: Save content
        if (req.method === 'POST' || req.method === 'PUT') {
            const { data } = req.body;

            if (!data) {
                return res.status(400).json({ error: 'Missing data in request body' });
            }

            await pool.query(`
        INSERT INTO app_content (entity_type, data)
        VALUES ($1, $2)
        ON CONFLICT (entity_type) 
        DO UPDATE SET data = $2, updated_at = NOW()
      `, [type, JSON.stringify(data)]);

            return res.status(200).json({ success: true, type });
        }

        // DELETE: Remove content (reset to empty)
        if (req.method === 'DELETE') {
            await pool.query(
                'DELETE FROM app_content WHERE entity_type = $1',
                [type]
            );

            return res.status(200).json({ success: true, deleted: type });
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
