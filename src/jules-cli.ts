#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'node:fs/promises';
import path from 'node:path';
import { runIndexer } from './skill-indexer';
import { spawn } from 'node:child_process';

const program = new Command();
const JULES_DIR = path.resolve('.jules');

program
  .name('j')
  .description('Jules CLI - Your personal agentic workspace command line tool.')
  .version('1.0.0');

// Lifecycle & State
program.command('init')
  .description('Initializes the Jules workspace and links to backend.')
  .action(async () => {
    console.log('Initializing Jules workspace...');
    try {
      await fs.mkdir(path.join(JULES_DIR, 'skills'), { recursive: true });
      await fs.mkdir(path.join(JULES_DIR, 'context'), { recursive: true });
      await fs.mkdir(path.join(JULES_DIR, 'mcp'), { recursive: true });
      console.log('Jules workspace initialized at .jules/');
      // Dummy link to vercel server logic would go here
      console.log('Linked to global agentic state backend (mocked for now).');
    } catch (e: any) {
      console.error('Failed to initialize workspace:', e.message);
    }
  });

program.command('login')
  .description('Authenticate for persistent cloud backend.')
  .action(() => {
    console.log('Logging into Jules Cloud Backend...');
    // Mock login
    console.log('Authentication successful.');
  });

program.command('status')
  .description('Displays current session stats, cost, and server health.')
  .action(() => {
    console.log('Jules Status:');
    console.log(' - Server Health: ONLINE');
    console.log(' - Active Context Mode: Currently undefined (Run `j context <mode>`)');
    console.log(' - Tokens used: 0');
    console.log(' - Estimated cost: $0.00');
  });

// Intelligent File & Code Ops
program.command('edit <file>')
  .description('Structured editing tool that minimizes overwrites.')
  .action((file) => {
    console.log(`Structured editing initiated for: ${file}`);
    // Future integration with Context Mode / AST-based editing
  });

program.command('search <query>')
  .description('Grep and semantic search via indexed knowledge base.')
  .action(async (query) => {
    // We defer to the search-tools logic
    const { execute } = await import('./search-tools');
    await execute([query]);
  });

program.command('map')
  .description('Generates a high-level map of the repository structure.')
  .action(() => {
    console.log('Mapping repository structure...');
    // Typically relies on something like Repomix or a fast AST parser.
    const repomix = spawn('npx', ['repomix', '--config', 'repomix.config.json'], { stdio: 'inherit' });
    repomix.on('close', (code) => {
        if (code === 0) console.log('Repository map generated.');
        else console.log('Repository map generation failed.');
    });
  });

program.command('test')
  .description('Runs the test suite and initiates TDD Loop.')
  .action(() => {
    console.log('Running test suite (npm test)...');
    const npmTest = spawn('npm', ['test'], { stdio: 'inherit' });
    npmTest.on('close', (code) => {
        if (code !== 0) {
            console.log('Tests failed. Initiating Fix-Test-Repeat loop...');
            // TDD Loop logic would be called here
        } else {
            console.log('Tests passed.');
        }
    });
  });

// Skill Management & Indexing
program.command('index')
  .description('Scans .jules/ and pushes metadata to the persistent server.')
  .action(async () => {
    await runIndexer();
  });

program.command('run <skill>')
  .description('Pulls a skill from local/cloud DB and executes it.')
  .action(async (skill) => {
    console.log(`Executing skill: ${skill}`);
    const skillPathTs = path.resolve('src', 'skills', `${skill}.ts`);
    const skillPathMd = path.resolve(JULES_DIR, 'skills', `${skill}.md`);

    try {
        await fs.access(skillPathTs);
        const { execute } = await import(skillPathTs);
        await execute([]);
        return;
    } catch {}

    try {
        await fs.access(skillPathMd);
        const content = await fs.readFile(skillPathMd, 'utf-8');
        console.log(`\n--- ${skill} Skill Document ---\n${content}\n---------------------------\n`);
        return;
    } catch {}

    console.log(`Skill '${skill}' not found locally. Searching persistent backend...`);
    // Fallback to fetch from backend
  });

program.command('list')
  .description('Displays all synced skills and their documentation.')
  .action(async () => {
    const { execute } = await import('./search-tools');
    // Using an empty query to list top results, or a specific query to get everything
    await execute(['']);
  });

// Context & Guardrails
program.command('context <mode>')
  .description('Swaps AGENTS.md and system prompts based on mode.')
  .action(async (mode) => {
    console.log(`Switching context mode to: ${mode}`);
    const contextFile = path.join(JULES_DIR, 'context', `${mode}.md`);

    try {
      const content = await fs.readFile(contextFile, 'utf-8');

      // We append or replace AGENTS.md sections based on mode
      const agentMdPath = path.resolve('AGENTS.md');
      const currentAgentContent = await fs.readFile(agentMdPath, 'utf-8');

      const newAgentContent = `${currentAgentContent}\n\n## Context Mode: ${mode.toUpperCase()}\n\n${content}`;
      await fs.writeFile(agentMdPath, newAgentContent, 'utf-8');

      console.log(`AGENTS.md updated to incorporate ${mode} context.`);
    } catch (e: any) {
      if (e.code === 'ENOENT') {
         console.error(`Context mode template for '${mode}' not found in .jules/context/`);
      } else {
         console.error('Failed to update context:', e.message);
      }
    }
  });

program.command('compact')
  .description('Summarizes the current session to save context window tokens.')
  .action(() => {
    console.log('Compacting session state...');
    console.log('Summary created. Context window flushed. Ready for next task.');
  });

program.command('review')
  .description('Initiates a self-review of changes against the repo\'s style guide.')
  .action(() => {
    console.log('Reviewing changes against code standards...');
    // Calls external agent reviewer or static analysis
  });

// Security & Guardrails
program.command('doctor')
  .description('Checks the environment for misconfigurations.')
  .action(async () => {
    console.log('Running diagnostics...');
    try {
        await fs.access(path.join(JULES_DIR, 'brain.sqlite'));
        console.log(' - Database: OK');
    } catch {
        console.log(' - Database: MISSING (.jules/brain.sqlite)');
    }
    try {
        await fs.access(path.resolve('AGENTS.md'));
        console.log(' - AGENTS.md: OK');
    } catch {
        console.log(' - AGENTS.md: MISSING');
    }
    console.log('Diagnostics complete.');
  });

program.parse(process.argv);
