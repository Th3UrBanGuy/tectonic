import pkg from 'pg';
const { Pool } = pkg;
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test connection
pool.on('connect', () => {
    console.log('✅ Connected to Neon database');
});

pool.on('error', (err) => {
    console.error('❌ Unexpected database error:', err);
});

// Helper functions

/**
 * Execute a query
 */
export async function query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
}

/**
 * Get a client from the pool
 */
export async function getClient() {
    const client = await pool.connect();
    const query = client.query.bind(client);
    const release = client.release.bind(client);

    // Set a timeout of 5 seconds, after which we will log a warning
    const timeout = setTimeout(() => {
        console.error('⚠️  A client has been checked out for more than 5 seconds!');
    }, 5000);

    // Override release to clear timeout
    client.release = () => {
        clearTimeout(timeout);
        client.release = release;
        return release();
    };

    return client;
}

/**
 * Content management helpers
 */
export const content = {
    async get(key) {
        const result = await query('SELECT value FROM content WHERE key = $1', [key]);
        return result.rows[0]?.value || null;
    },

    async set(key, value, category = null) {
        await query(`
            INSERT INTO content (key, value, category)
            VALUES ($1, $2, $3)
            ON CONFLICT (key) 
            DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP
        `, [key, value, category]);
    },

    async getByCategory(category) {
        const result = await query('SELECT * FROM content WHERE category = $1', [category]);
        return result.rows;
    }
};

/**
 * User management helpers
 */
export const users = {
    async findByEmail(email) {
        const result = await query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0] || null;
    },

    async create(email, password_hash, name, role = 'admin') {
        const result = await query(`
            INSERT INTO users (email, password_hash, name, role)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [email, password_hash, name, role]);
        return result.rows[0];
    }
};

/**
 * Contact submissions helpers
 */
export const contacts = {
    async create(name, email, subject, message) {
        const result = await query(`
            INSERT INTO contact_submissions (name, email, subject, message)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [name, email, subject, message]);
        return result.rows[0];
    },

    async getAll(status = null) {
        const queryText = status
            ? 'SELECT * FROM contact_submissions WHERE status = $1 ORDER BY created_at DESC'
            : 'SELECT * FROM contact_submissions ORDER BY created_at DESC';
        const params = status ? [status] : [];
        const result = await query(queryText, params);
        return result.rows;
    },

    async updateStatus(id, status) {
        await query('UPDATE contact_submissions SET status = $1 WHERE id = $2', [status, id]);
    }
};

/**
 * Links management helpers
 */
export const links = {
    async getAll(category = null) {
        const queryText = category
            ? 'SELECT * FROM links WHERE category = $1 AND is_active = true ORDER BY created_at DESC'
            : 'SELECT * FROM links WHERE is_active = true ORDER BY created_at DESC';
        const params = category ? [category] : [];
        const result = await query(queryText, params);
        return result.rows;
    },

    async create(title, url, category, icon) {
        const result = await query(`
            INSERT INTO links (title, url, category, icon)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [title, url, category, icon]);
        return result.rows[0];
    },

    async delete(id) {
        await query('UPDATE links SET is_active = false WHERE id = $1', [id]);
    }
};

export default pool;
