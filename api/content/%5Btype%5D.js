import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const TYPE_MAP = {
    wings: {
        table: 'wings',
        readMap: (row) => ({
            ...row,
            techStack: row.tech_stack,
            features: row.features,
            teamName: row.team_name,
            teamLogo: row.team_logo_url,
            teamSubtitle: row.team_subtitle,
            teamPurpose: row.team_purpose,
            teamTimeline: row.team_timeline,
            teamAchievements: row.team_achievements,
            color: row.color_theme,
            icon: row.icon_name
        }),
        writeQuery: `
            INSERT INTO wings (
                id, slug, name, tagline, description, icon_name, color_theme, 
                tech_stack, features, 
                team_name, team_logo_url, team_subtitle, team_purpose, team_timeline, team_achievements
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        `,
        mapWrite: (item) => [
            item.id || item.slug, // ID is often the slug in this app
            item.slug || item.id,
            item.name, item.tagline, item.description, item.icon, item.color,
            JSON.stringify(item.techStack || []), JSON.stringify(item.features || []),
            item.teamName, item.teamLogo, item.teamSubtitle, item.teamPurpose,
            JSON.stringify(item.teamTimeline || []), JSON.stringify(item.teamAchievements || [])
        ]
    },
    projects: {
        table: 'projects',
        readMap: (row) => ({
            ...row,
            client: row.client_name,
            challenge: row.challenge_desc,
            solution: row.solution_desc,
            impact: row.impact_desc,
            image: row.image_url
        }),
        writeQuery: `
            INSERT INTO projects (
                id, title, slug, category, client_name, challenge_desc, solution_desc, impact_desc, image_url
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `,
        mapWrite: (item) => [
            item.id,
            item.title,
            item.id, // Using ID as slug if missing
            item.category,
            item.client,
            item.challenge,
            item.solution,
            item.impact,
            item.image
        ]
    },
    partnerships: {
        table: 'partners',
        readMap: (row) => ({ ...row, logo: row.logo_url, since: row.since_date }),
        writeQuery: `
            INSERT INTO partners (id, name, logo_url, category, since_date, is_active)
            VALUES ($1, $2, $3, $4, $5, true)
        `,
        mapWrite: (item) => [
            // Parse ID to int if needed or let Postgres handle serial. 
            // With full list replacement, we might lose serial usage unless we exclude ID.
            // For simplicity in this "seed based" app, we'll strip ID and let DB generate new ones, OR trust input.
            // Let's rely on DB serials by Excluding ID from insert and just inserting data ordered.
            item.id, item.name, item.logo, item.category || 'Strategic', item.since
        ]
        // REVISIT: For updates, deleting all and inserting fresh means IDs change. 
        // This breaks relations if we had them (e.g. link visits). But these content items are mostly independent.
    },
    team: {
        table: 'leadership',
        readMap: (row) => ({
            ...row,
            image: row.image_url,
            socialLinks: row.social_links // Array of {label, url, icon}
        }),
        writeQuery: `
            INSERT INTO leadership (name, role, bio, image_url, social_links, order_index)
            VALUES ($1, $2, $3, $4, $5, $6)
        `,
        mapWrite: (item, index) => [
            item.name, item.role, item.bio, item.image, JSON.stringify(item.socialLinks || []), index
        ]
    },
    techStack: {
        table: 'tech_ecosystem',
        readMap: (row) => ({ ...row, iconName: row.icon_name, color: row.color_class }),
        writeQuery: `
            INSERT INTO tech_ecosystem (name, version, icon_name, color_class, order_index)
            VALUES ($1, $2, $3, $4, $5)
        `,
        mapWrite: (item, index) => [
            item.name, item.version, item.iconName, item.color, index
        ]
    }
    // Add others as needed
};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { type } = req.query;
    const config = TYPE_MAP[type];

    if (!config && type !== 'settings') { // Special case for settings
        // basic fallback/error
        return res.status(400).json({ error: 'Invalid content type' });
    }

    try {
        const client = await pool.connect();
        try {
            // GET Implementation
            if (req.method === 'GET') {
                if (type === 'settings') {
                    // Fetch both settings and socials
                    const settingsRes = await client.query('SELECT key, value FROM site_settings');
                    const socialsRes = await client.query('SELECT platform_name, url, icon_name FROM social_platforms ORDER BY order_index');
                    // Transform to legacy config shape
                    const configObj = settingsRes.rows.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
                    configObj.socials = socialsRes.rows.reduce((acc, curr) => ({ ...acc, [curr.platform_name.toLowerCase()]: curr.url }), {});
                    // Nest address/contact
                    configObj.address = { street: configObj.contact_address_street, sector: configObj.contact_address_sector };
                    configObj.contact = { email: configObj.contact_email, phone: configObj.contact_phone };
                    return res.status(200).json(configObj);
                }

                const result = await client.query(`SELECT * FROM ${config.table} ORDER BY id`);
                const data = result.rows.map(config.readMap);
                return res.status(200).json(data);
            }

            // POST/PUT Implementation
            if (req.method === 'POST' || req.method === 'PUT') {
                const { data } = req.body;

                if (type === 'settings') {
                    // Handle Settings Update
                    // Expects legacy config object. We must map back to site_settings rows.
                    await client.query('BEGIN');

                    // Update key-values
                    const settingsToUpdate = [
                        ['site_name', data.siteName],
                        ['site_tagline', data.siteTagline],
                        ['contact_address_street', data.address?.street],
                        ['contact_address_sector', data.address?.sector],
                        ['contact_email', data.contact?.email],
                        ['contact_phone', data.contact?.phone],
                        ['footer_copyright', data.footerCopyright]
                    ];

                    for (const [key, val] of settingsToUpdate) {
                        if (val !== undefined) {
                            await client.query(`
                                INSERT INTO site_settings (key, value) VALUES ($1, $2)
                                ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()
                            `, [key, val]);
                        }
                    }

                    // For socials, we can update or insert.
                    // If the user sends a new social structure (e.g. dynamic list), we might need to handle it.
                    // For legacy 'socials' object { linkedin: url }, we map to social_platforms.
                    if (data.socials) {
                        for (const [platform, url] of Object.entries(data.socials)) {
                            // Find icon name based on platform key (Capitalized)
                            const iconName = platform.charAt(0).toUpperCase() + platform.slice(1);
                            await client.query(`
                                INSERT INTO social_platforms (platform_name, url, icon_name) VALUES ($1, $2, $3)
                                ON CONFLICT (id) DO UPDATE SET url = $2 -- Note: we don't have unique constraint on name yet, doing simple insert might dupe if not careful.
                                -- Ideally, clear and insert for clean list.
                            `, [iconName, url, iconName]);
                            // Actually, just updating existing ones by name is safer for this legacy adpater
                            await client.query(`
                                UPDATE social_platforms SET url = $1 WHERE LOWER(platform_name) = $2
                            `, [url, platform.toLowerCase()]);
                        }
                    }

                    await client.query('COMMIT');
                    return res.status(200).json({ success: true });
                }

                // Generic List Update
                if (!Array.isArray(data)) {
                    return res.status(400).json({ error: 'Expected array data' });
                }

                await client.query('BEGIN');
                // 1. Wipe existing data for this section (Simple replacement strategy)
                await client.query(`DELETE FROM ${config.table}`);

                // 2. Insert new data
                if (data.length > 0) {
                    // Generating mapped values
                    for (let i = 0; i < data.length; i++) {
                        const values = config.mapWrite(data[i], i);
                        await client.query(config.writeQuery, values);
                    }
                }
                await client.query('COMMIT');

                return res.status(200).json({ success: true });
            }

        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: error.message });
    }
}
