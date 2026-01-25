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
        // GET: Retrieve all content and config (Aggregated from new tables)
        if (req.method === 'GET') {
            // Run queries in parallel
            const [
                wingsResult,
                projectsResult,
                partnersResult,
                techResult,
                roadmapResult,
                teamResult,
                timelineResult,
                settingsResult,
                socialsResult,
                pagesResult,
                menuItemsResult
            ] = await Promise.all([
                pool.query('SELECT * FROM wings ORDER BY id'),
                pool.query('SELECT * FROM projects ORDER BY id'),
                pool.query('SELECT * FROM partners WHERE is_active = true ORDER BY order_index'),
                pool.query('SELECT * FROM tech_ecosystem ORDER BY order_index'),
                pool.query('SELECT * FROM roadmap_items ORDER BY year, quarter'),
                pool.query('SELECT * FROM leadership ORDER BY order_index'),
                pool.query(`SELECT year, title, description FROM roadmap_items WHERE status = 'Completed' OR status = 'In Progress' ORDER BY year DESC`),
                pool.query('SELECT key, value FROM site_settings'),
                pool.query('SELECT platform_name, url, icon_name FROM social_platforms WHERE is_active = true ORDER BY order_index'),
                pool.query('SELECT * FROM pages'),
                pool.query('SELECT m.location_slug, mi.* FROM menu_items mi JOIN menus m ON mi.menu_id = m.id ORDER BY m.location_slug, mi.order_index')
            ]);

            // Construct Response Object to match frontend expectations
            const content = {
                wings: wingsResult.rows.map(w => ({
                    ...w,
                    techStack: w.tech_stack,
                    features: w.features,
                    teamName: w.team_name,
                    teamLogo: w.team_logo_url,
                    teamSubtitle: w.team_subtitle,
                    teamPurpose: w.team_purpose,
                    teamTimeline: w.team_timeline,
                    teamAchievements: w.team_achievements,
                    color: w.color_theme,
                    icon: w.icon_name
                })),
                projects: projectsResult.rows.map(p => ({
                    ...p,
                    client: p.client_name,
                    challenge: p.challenge_desc,
                    solution: p.solution_desc,
                    impact: p.impact_desc,
                    image: p.image_url
                })),
                partnerships: partnersResult.rows.map(p => ({
                    ...p,
                    logo: p.logo_url,
                    since: p.since_date
                })),
                techStack: techResult.rows.map(t => ({
                    ...t,
                    iconName: t.icon_name,
                    color: t.color_class
                })),
                roadmap: roadmapResult.rows.map(r => ({
                    ...r,
                    colorTheme: r.color_theme
                })),
                team: teamResult.rows.map(t => ({
                    ...t,
                    image: t.image_url,
                    socialLinks: t.social_links
                })),
                timeline: timelineResult.rows,

                // V2 Dynamic Content
                pages: pagesResult.rows,
                menus: menuItemsResult.rows.reduce((acc, item) => {
                    if (!acc[item.location_slug]) acc[item.location_slug] = [];
                    acc[item.location_slug].push({
                        label: item.label,
                        path: item.path,
                        order: item.order_index,
                        id: item.id
                    });
                    return acc;
                }, {}),

                // Legacy Placeholders
                homeContent: {},
                companyContent: {},
                portfolioContent: {},
                innovationContent: {}
            };

            const config = {
                ...settingsResult.rows.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {}),
                socials: socialsResult.rows.reduce((acc, curr) => ({ ...acc, [curr.platform_name.toLowerCase()]: curr.url }), {})
            };

            config.address = {
                street: config.contact_address_street,
                sector: config.contact_address_sector
            };
            config.contact = {
                email: config.contact_email,
                phone: config.contact_phone
            };

            return res.status(200).json({ content, config });
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
