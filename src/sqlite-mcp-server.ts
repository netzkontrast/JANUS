import { FastMCP } from "fastmcp";
import Database from "better-sqlite3";
import { z } from "zod";
import path from "node:path";
import fs from "node:fs/promises";

// Configuration
const JULES_DIR = path.resolve('.jules');
const DB_PATH = process.env.SQLITE_DB_PATH || path.join(JULES_DIR, 'brain.sqlite');

const server = new FastMCP({
  name: "Jules Brain Server",
  version: "1.0.0",
});

async function checkDb() {
  try {
    await fs.access(DB_PATH);
    return true;
  } catch {
    return false;
  }
}

server.addTool({
  name: "read_query",
  description: "Execute a SELECT query on the Jules Brain database.",
  parameters: z.object({
    query: z.string().describe("SELECT SQL query to execute"),
    params: z.array(z.any()).optional().describe("Optional list of parameters for the query"),
    row_limit: z.number().default(100).describe("Maximum number of rows to return"),
  }),
  execute: async (args) => {
    if (!await checkDb()) {
      throw new Error(`Database not found at: ${DB_PATH}`);
    }

    let query = args.query.trim();
    if (query.endsWith(';')) query = query.slice(0, -1).trim();

    if (query.includes(';') && !query.match(/'.*;.*'/)) {
        throw new Error("Multiple SQL statements are not allowed");
    }

    const queryLower = query.toLowerCase();
    if (!queryLower.startsWith('select') && !queryLower.startsWith('with')) {
        throw new Error("Only SELECT queries (including WITH clauses) are allowed for safety");
    }

    const db = new Database(DB_PATH, { readonly: true });
    try {
        if (!queryLower.includes('limit')) {
            query = `${query} LIMIT ${args.row_limit}`;
        }
        const stmt = db.prepare(query);
        const results = stmt.all(args.params || []);
        return JSON.stringify(results);
    } catch (e: any) {
        throw new Error(`SQLite error: ${e.message}`);
    } finally {
        db.close();
    }
  },
});

server.addTool({
    name: "list_tables",
    description: "List all tables in the Jules Brain database.",
    parameters: z.object({}),
    execute: async () => {
        if (!await checkDb()) {
            throw new Error(`Database not found at: ${DB_PATH}`);
        }
        const db = new Database(DB_PATH, { readonly: true });
        try {
            const stmt = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
            const results = stmt.all();
            return JSON.stringify(results.map((r: any) => r.name));
        } catch (e: any) {
            throw new Error(`SQLite error: ${e.message}`);
        } finally {
            db.close();
        }
    }
});

server.addTool({
    name: "describe_table",
    description: "Get detailed information about a table's schema.",
    parameters: z.object({
        table_name: z.string()
    }),
    execute: async (args) => {
        if (!await checkDb()) {
            throw new Error(`Database not found at: ${DB_PATH}`);
        }
        const db = new Database(DB_PATH, { readonly: true });
        try {
            const stmt = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?");
            const exists = stmt.get(args.table_name);
            if (!exists) {
                throw new Error(`Table '${args.table_name}' does not exist`);
            }

            const schemaStmt = db.prepare(`PRAGMA table_info(${args.table_name})`);
            const columns = schemaStmt.all();
            return JSON.stringify(columns);
        } catch (e: any) {
            throw new Error(`SQLite error: ${e.message}`);
        } finally {
            db.close();
        }
    }
});

server.start({
  transportType: "stdio",
});
