import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import { withAdminAuth } from './middleware.js';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // GET: List all users (admin only)
        if (req.method === 'GET') {
            const result = await pool.query(
                'SELECT id, email, name, role, created_at, updated_at FROM users ORDER BY created_at DESC'
            );
            return res.status(200).json(result.rows);
        }

        // POST: Create new user
        if (req.method === 'POST') {
            const { email, password, name, role = 'admin' } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            // Check if email already exists
            const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
            if (existing.rows.length > 0) {
                return res.status(409).json({ error: 'Email already registered' });
            }

            // Hash password
            const password_hash = await bcrypt.hash(password, 10);

            // Create user
            const result = await pool.query(`
        INSERT INTO users (email, password_hash, name, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, name, role, created_at
      `, [email.toLowerCase().trim(), password_hash, name || '', role]);

            return res.status(201).json({
                success: true,
                user: result.rows[0]
            });
        }

        // PUT: Update user
        if (req.method === 'PUT') {
            const { id, email, password, name, role } = req.body;

            if (!id) {
                return res.status(400).json({ error: 'User ID is required' });
            }

            let updateQuery = 'UPDATE users SET updated_at = NOW()';
            const params = [];
            let paramIndex = 1;

            if (email) {
                updateQuery += `, email = $${paramIndex++}`;
                params.push(email.toLowerCase().trim());
            }
            if (name !== undefined) {
                updateQuery += `, name = $${paramIndex++}`;
                params.push(name);
            }
            if (role) {
                updateQuery += `, role = $${paramIndex++}`;
                params.push(role);
            }
            if (password) {
                const password_hash = await bcrypt.hash(password, 10);
                updateQuery += `, password_hash = $${paramIndex++}`;
                params.push(password_hash);
            }

            updateQuery += ` WHERE id = $${paramIndex} RETURNING id, email, name, role`;
            params.push(id);

            const result = await pool.query(updateQuery, params);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.status(200).json({
                success: true,
                user: result.rows[0]
            });
        }

        // DELETE: Remove user
        if (req.method === 'DELETE') {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ error: 'User ID is required' });
            }

            // Prevent deleting the last admin
            const adminCount = await pool.query("SELECT COUNT(*) FROM users WHERE role = 'admin'");
            const userToDelete = await pool.query('SELECT role FROM users WHERE id = $1', [id]);

            if (userToDelete.rows[0]?.role === 'admin' && parseInt(adminCount.rows[0].count) <= 1) {
                return res.status(400).json({ error: 'Cannot delete the last admin user' });
            }

            await pool.query('DELETE FROM users WHERE id = $1', [id]);

            return res.status(200).json({ success: true, deleted: id });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('User management error:', error);
        return res.status(500).json({ error: 'Operation failed' });
    }
}

// Export with admin authentication middleware
export default withAdminAuth(handler);
