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

async function deploy() {
    const client = await pool.connect();

    try {
        console.log('');
        console.log('╔════════════════════════════════════════════════════╗');
        console.log('║     TECHTONIC DATABASE DEPLOYMENT                  ║');
        console.log('╚════════════════════════════════════════════════════╝');
        console.log('');
        console.log('🔌 Connecting to Neon database...');

        // Step 1: Run Schema
        console.log('');
        console.log('📋 Step 1: Creating schema...');
        const schemaSQL = readFileSync(join(__dirname, 'schema-final.sql'), 'utf-8');
        await client.query(schemaSQL);
        console.log('   ✅ Schema created successfully!');

        // Step 2: Run Seed Data
        console.log('');
        console.log('🌱 Step 2: Seeding data...');
        const seedSQL = readFileSync(join(__dirname, 'seed-final.sql'), 'utf-8');
        await client.query(seedSQL);
        console.log('   ✅ Seed data inserted!');

        // Step 3: Verify
        console.log('');
        console.log('🔍 Step 3: Verifying...');

        const userCount = await client.query('SELECT COUNT(*) FROM users');
        const wingsCount = await client.query('SELECT COUNT(*) FROM wings');
        const projectsCount = await client.query('SELECT COUNT(*) FROM projects');
        const settingsCount = await client.query('SELECT COUNT(*) FROM site_settings');

        console.log('');
        console.log('┌────────────────────────────────────────────────────┐');
        console.log('│  DATABASE STATISTICS                               │');
        console.log('├────────────────────────────────────────────────────┤');
        console.log(`│  Users:        ${userCount.rows[0].count.padStart(3)}                               │`);
        console.log(`│  Wings:        ${wingsCount.rows[0].count.padStart(3)}                               │`);
        console.log(`│  Projects:     ${projectsCount.rows[0].count.padStart(3)}                               │`);
        console.log(`│  Settings:     ${settingsCount.rows[0].count.padStart(3)}                               │`);
        console.log('└────────────────────────────────────────────────────┘');
        console.log('');
        console.log('┌────────────────────────────────────────────────────┐');
        console.log('│  DEFAULT ADMIN CREDENTIALS                         │');
        console.log('├────────────────────────────────────────────────────┤');
        console.log('│  📧 Email:    admin@tectonic.com                   │');
        console.log('│  🔑 Password: admin123                             │');
        console.log('└────────────────────────────────────────────────────┘');
        console.log('');
        console.log('⚠️  IMPORTANT: Change the admin password in production!');
        console.log('');
        console.log('🎉 Deployment complete!');
        console.log('');

    } catch (error) {
        console.error('');
        console.error('❌ Deployment failed:', error.message);
        console.error('');
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

deploy().catch(console.error);
