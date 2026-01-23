import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // GET: Retrieve all content and config (for initial load)
        if (req.method === 'GET') {
            const contentResult = await pool.query('SELECT entity_type, data FROM app_content');
            const configResult = await pool.query('SELECT key, value FROM app_config');

            const content = {};
            contentResult.rows.forEach(row => {
                content[row.entity_type] = row.data;
            });

            const config = {};
            configResult.rows.forEach(row => {
                config[row.key] = row.value;
            });

            return res.status(200).json({ content, config });
        }

        // POST: Bulk update (for import functionality)
        if (req.method === 'POST') {
            const { content, config } = req.body;

            // Update content
            if (content) {
                for (const [type, data] of Object.entries(content)) {
                    await pool.query(`
            INSERT INTO app_content (entity_type, data)
            VALUES ($1, $2)
            ON CONFLICT (entity_type) 
            DO UPDATE SET data = $2, updated_at = NOW()
          `, [type, JSON.stringify(data)]);
                }
            }

            // Update config
            if (config) {
                for (const [key, value] of Object.entries(config)) {
                    await pool.query(`
            INSERT INTO app_config (key, value)
            VALUES ($1, $2)
            ON CONFLICT (key) 
            DO UPDATE SET value = $2, updated_at = NOW()
          `, [key, JSON.stringify(value)]);
                }
            }

            return res.status(200).json({ success: true });
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
