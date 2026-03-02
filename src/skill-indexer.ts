import fs from 'node:fs/promises';
import path from 'node:path';
import Database from 'better-sqlite3';

const JULES_DIR = path.resolve('.jules');
const DB_PATH = path.join(JULES_DIR, 'brain.sqlite');
const SKILLS_DIR = path.join('src', 'skills');
const CONTEXT_DIR = path.join(JULES_DIR, 'context');

// Ensure database table exists
function setupDatabase(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS agent_knowledge (
      name TEXT PRIMARY KEY,
      type TEXT,
      description TEXT,
      code_blob TEXT
    );
  `);
}

async function indexDirectory(dir: string, type: string, db: Database.Database) {
  try {
    const files = await fs.readdir(dir);

    for (const file of files) {
      if (file.endsWith('.ts') || file.endsWith('.md')) {
        const filePath = path.join(dir, file);
        const code_blob = await fs.readFile(filePath, 'utf-8');
        const name = path.basename(file, path.extname(file));

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
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.warn(`Directory ${dir} not found. Skipping.`);
    } else {
      console.error(`Error indexing directory ${dir}:`, error);
    }
  }
}

export async function runIndexer() {
  console.log('Starting skill indexer...');
  const db = new Database(DB_PATH);
  setupDatabase(db);

  await indexDirectory(SKILLS_DIR, 'skill', db);
  await indexDirectory(CONTEXT_DIR, 'context', db);

  db.close();
  console.log('Indexing complete.');
}

if (require.main === module) {
  runIndexer().catch(console.error);
}