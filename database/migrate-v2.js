import pkg from 'pg';
const { Pool } = pkg;
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function runMigration() {
    const client = await pool.connect();

    try {
        console.log('🔌 Connected to Neon database...');

        // Run schema v2
        console.log('📋 Creating schema...');
        const schemaSQL = readFileSync(join(__dirname, 'schema-v2.sql'), 'utf-8');
        await client.query(schemaSQL);
        console.log('✅ Schema created successfully!');

        // Run seed data
        console.log('🌱 Seeding data...');
        const seedSQL = readFileSync(join(__dirname, 'seed.sql'), 'utf-8');
        await client.query(seedSQL);
        console.log('✅ Seed data inserted successfully!');

        // Verify data
        const contentCount = await client.query('SELECT COUNT(*) FROM app_content');
        const configCount = await client.query('SELECT COUNT(*) FROM app_config');
        const userCount = await client.query('SELECT COUNT(*) FROM users');

        console.log('\n📊 Database Stats:');
        console.log(`   - Content entries: ${contentCount.rows[0].count}`);
        console.log(`   - Config entries: ${configCount.rows[0].count}`);
        console.log(`   - Users: ${userCount.rows[0].count}`);

        console.log('\n🎉 Migration complete!\n');

    } catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

runMigration().catch(console.error);
