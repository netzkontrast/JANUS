// This is a Jules Skill
// Used to find the best tool by querying the SQLite MCP server directly

import Database from 'better-sqlite3';
import path from 'node:path';

const DB_PATH = path.resolve('.jules', 'brain.sqlite');

export async function execute(args: string[]) {
    const query = args.join(' ');
    console.log(`Searching for tool best matching: "${query}"`);

    try {
        const db = new Database(DB_PATH, { readonly: true });
        // Very basic wildcard search - could be expanded to use FTS5 if enabled
        const stmt = db.prepare(`
            SELECT name, description, type
            FROM agent_knowledge
            WHERE name LIKE ? OR description LIKE ?
            LIMIT 5
        `);

        const searchParam = `%${query}%`;
        const results = stmt.all(searchParam, searchParam);

        if (results.length === 0) {
            console.log('No matching tools or context found.');
        } else {
            console.log('\nTop matches found:\n');
            results.forEach((row: any) => {
                console.log(`[${row.type.toUpperCase()}] ${row.name}`);
                console.log(`Description: ${row.description || 'No description provided'}\n`);
            });
        }
        db.close();
    } catch (e: any) {
        console.error('Error querying Jules Brain database:', e.message);
    }
}
