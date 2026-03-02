"use strict";
// This is a Jules Skill
// Used to find the best tool by querying the SQLite MCP server directly
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const node_path_1 = __importDefault(require("node:path"));
const DB_PATH = node_path_1.default.resolve('.jules', 'brain.sqlite');
async function execute(args) {
    const query = args.join(' ');
    console.log(`Searching for tool best matching: "${query}"`);
    try {
        const db = new better_sqlite3_1.default(DB_PATH, { readonly: true });
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
        }
        else {
            console.log('\nTop matches found:\n');
            results.forEach((row) => {
                console.log(`[${row.type.toUpperCase()}] ${row.name}`);
                console.log(`Description: ${row.description || 'No description provided'}\n`);
            });
        }
        db.close();
    }
    catch (e) {
        console.error('Error querying Jules Brain database:', e.message);
    }
}
