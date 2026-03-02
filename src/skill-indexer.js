"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runIndexer = runIndexer;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const JULES_DIR = node_path_1.default.resolve('.jules');
const DB_PATH = node_path_1.default.join(JULES_DIR, 'brain.sqlite');
const SKILLS_DIR = node_path_1.default.join('src', 'skills');
const CONTEXT_DIR = node_path_1.default.join(JULES_DIR, 'context');
// Ensure database table exists
function setupDatabase(db) {
    db.exec(`
    CREATE TABLE IF NOT EXISTS agent_knowledge (
      name TEXT PRIMARY KEY,
      type TEXT,
      description TEXT,
      code_blob TEXT
    );
  `);
}
async function indexDirectory(dir, type, db) {
    try {
        const files = await promises_1.default.readdir(dir);
        for (const file of files) {
            if (file.endsWith('.ts') || file.endsWith('.md')) {
                const filePath = node_path_1.default.join(dir, file);
                const code_blob = await promises_1.default.readFile(filePath, 'utf-8');
                const name = node_path_1.default.basename(file, node_path_1.default.extname(file));
                // Very basic description extraction (could be enhanced later)
                let description = '';
                if (code_blob.startsWith('//') || code_blob.startsWith('#')) {
                    description = code_blob.split('\n')[0].replace(/^(\/\/|#)\s*/, '');
                }
                const stmt = db.prepare(`
          INSERT INTO agent_knowledge (name, type, description, code_blob)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(name) DO UPDATE SET
            type = excluded.type,
            description = excluded.description,
            code_blob = excluded.code_blob
        `);
                stmt.run(name, type, description, code_blob);
                console.log(`Indexed ${type}: ${name}`);
            }
        }
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            console.warn(`Directory ${dir} not found. Skipping.`);
        }
        else {
            console.error(`Error indexing directory ${dir}:`, error);
        }
    }
}
async function runIndexer() {
    console.log('Starting skill indexer...');
    const db = new better_sqlite3_1.default(DB_PATH);
    setupDatabase(db);
    await indexDirectory(SKILLS_DIR, 'skill', db);
    await indexDirectory(CONTEXT_DIR, 'context', db);
    db.close();
    console.log('Indexing complete.');
}
if (require.main === module) {
    runIndexer().catch(console.error);
}
