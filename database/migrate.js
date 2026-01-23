import pkg from 'pg';
const { Pool } = pkg;
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function runMigration() {
    const client = await pool.connect();

    try {
        console.log('🔌 Connected to Neon database...');

        // Read and execute schema
        const schemaSQL = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
        await client.query(schemaSQL);

        console.log('✅ Database schema created successfully!');

        // Insert default admin user (password: admin123)
        const bcrypt = await import('bcryptjs');
        const hashedPassword = await bcrypt.hash('admin123', 10);

        await client.query(`
            INSERT INTO users (email, password_hash, name, role)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (email) DO NOTHING
        `, ['admin@tectonic.com', hashedPassword, 'Admin', 'admin']);

        console.log('✅ Default admin user created (email: admin@tectonic.com, password: admin123)');

        // Insert sample content
        const sampleContent = [
            { key: 'site.name', value: 'TECTONIC', category: 'site' },
            { key: 'site.tagline', value: 'Architecting Tomorrow', category: 'site' },
            { key: 'contact.phone', value: '+880 171-1234567', category: 'contact' },
            { key: 'contact.email', value: 'support@techt0nic.com', category: 'contact' }
        ];

        for (const item of sampleContent) {
            await client.query(`
                INSERT INTO content (key, value, category)
                VALUES ($1, $2, $3)
                ON CONFLICT (key) DO NOTHING
            `, [item.key, item.value, item.category]);
        }

        console.log('✅ Sample content inserted!');
        console.log('\n🎉 Database setup complete!\n');

    } catch (error) {
        console.error('❌ Error during migration:', error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

runMigration().catch(console.error);
