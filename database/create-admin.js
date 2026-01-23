import pkg from 'pg';
const { Pool } = pkg;
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function createAdmin() {
    const client = await pool.connect();

    try {
        console.log('🔌 Connected to Neon database...');

        // Admin credentials
        const adminEmail = 'admin@tectonic.com';
        const adminPassword = 'admin123';
        const adminName = 'System Admin';

        // Hash password with bcrypt
        const password_hash = await bcrypt.hash(adminPassword, 10);

        console.log('🔐 Creating admin user...');

        // Delete existing admin (if any) and create fresh
        await client.query('DELETE FROM users WHERE email = $1', [adminEmail]);

        // Insert admin user
        await client.query(`
            INSERT INTO users (email, password_hash, name, role)
            VALUES ($1, $2, $3, $4)
        `, [adminEmail, password_hash, adminName, 'admin']);

        console.log('✅ Admin user created successfully!');
        console.log('');
        console.log('📧 Email:    admin@tectonic.com');
        console.log('🔑 Password: admin123');
        console.log('');
        console.log('⚠️  IMPORTANT: Change this password in production!');
        console.log('');

    } catch (error) {
        console.error('❌ Error creating admin:', error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

createAdmin().catch(console.error);
