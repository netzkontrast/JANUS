"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastmcp_1 = require("fastmcp");
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const zod_1 = require("zod");
const node_path_1 = __importDefault(require("node:path"));
const promises_1 = __importDefault(require("node:fs/promises"));
const sdk_1 = require("@openrouter/sdk");
// Configuration
const JULES_DIR = node_path_1.default.resolve('.jules');
const DB_PATH = process.env.SQLITE_DB_PATH || node_path_1.default.join(JULES_DIR, 'brain.sqlite');
const server = new fastmcp_1.FastMCP({
    name: "Jules Brain Server",
    version: "1.0.0",
});
async function checkDb() {
    try {
        await promises_1.default.access(DB_PATH);
        return true;
    }
    catch {
        return false;
    }
}
server.addTool({
    name: "read_query",
    description: "Execute a SELECT query on the Jules Brain database.",
    parameters: zod_1.z.object({
        query: zod_1.z.string().describe("SELECT SQL query to execute"),
        params: zod_1.z.array(zod_1.z.any()).optional().describe("Optional list of parameters for the query"),
        row_limit: zod_1.z.number().default(100).describe("Maximum number of rows to return"),
    }),
    execute: async (args) => {
        if (!await checkDb()) {
            throw new Error(`Database not found at: ${DB_PATH}`);
        }
        let query = args.query.trim();
        if (query.endsWith(';'))
            query = query.slice(0, -1).trim();
        if (query.includes(';') && !query.match(/'.*;.*'/)) {
            throw new Error("Multiple SQL statements are not allowed");
        }
        const queryLower = query.toLowerCase();
        if (!queryLower.startsWith('select') && !queryLower.startsWith('with')) {
            throw new Error("Only SELECT queries (including WITH clauses) are allowed for safety");
        }
        const db = new better_sqlite3_1.default(DB_PATH, { readonly: true });
        try {
            if (!queryLower.includes('limit')) {
                query = `${query} LIMIT ${args.row_limit}`;
            }
            const stmt = db.prepare(query);
            const results = stmt.all(args.params || []);
            return JSON.stringify(results);
        }
        catch (e) {
            throw new Error(`SQLite error: ${e.message}`);
        }
        finally {
            db.close();
        }
    },
});
server.addTool({
    name: "list_tables",
    description: "List all tables in the Jules Brain database.",
    parameters: zod_1.z.object({}),
    execute: async () => {
        if (!await checkDb()) {
            throw new Error(`Database not found at: ${DB_PATH}`);
        }
        const db = new better_sqlite3_1.default(DB_PATH, { readonly: true });
        try {
            const stmt = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
            const results = stmt.all();
            return JSON.stringify(results.map((r) => r.name));
        }
        catch (e) {
            throw new Error(`SQLite error: ${e.message}`);
        }
        finally {
            db.close();
        }
    }
});
server.addTool({
    name: "describe_table",
    description: "Get detailed information about a table's schema.",
    parameters: zod_1.z.object({
        table_name: zod_1.z.string()
    }),
    execute: async (args) => {
        if (!await checkDb()) {
            throw new Error(`Database not found at: ${DB_PATH}`);
        }
        const db = new better_sqlite3_1.default(DB_PATH, { readonly: true });
        try {
            const stmt = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?");
            const exists = stmt.get(args.table_name);
            if (!exists) {
                throw new Error(`Table '${args.table_name}' does not exist`);
            }
            const schemaStmt = db.prepare(`PRAGMA table_info(${args.table_name})`);
            const columns = schemaStmt.all();
            return JSON.stringify(columns);
        }
        catch (e) {
            throw new Error(`SQLite error: ${e.message}`);
        }
        finally {
            db.close();
        }
    }
});
server.addTool({
    name: "chat_with_model",
    description: "Chat with a model using OpenRouter.",
    parameters: zod_1.z.object({
        model: zod_1.z.string().describe("The model to use, e.g. openai/gpt-4o-mini"),
        message: zod_1.z.string().describe("The message to send"),
    }),
    execute: async (args) => {
        const openRouter = new sdk_1.OpenRouter({
            apiKey: process.env.OPENROUTER_API_KEY,
        });
        try {
            const result = await openRouter.chat.send({
                chatGenerationParams: {
                    messages: [
                        {
                            role: "user",
                            content: args.message,
                        },
                    ],
                    model: args.model,
                    stream: false,
                    temperature: 0.7,
                    topP: 1.0,
                }
            });
            return JSON.stringify(result);
        }
        catch (e) {
            throw new Error(`OpenRouter error: ${e.message}`);
        }
    },
});
server.start({
    transportType: "stdio",
});
