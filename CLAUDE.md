# CLAUDE.md — JANUS Project

## Project
JANUS is a Dual-Cognition AI Orchestration System for AI-assisted novel development.
Tech Stack: Next.js 15, React 19, TypeScript (strict), Tailwind CSS, Vercel AI SDK, Model Context Protocol (MCP).

Working Language: English for all documentation, comments, code, and variable names.

## Architecture
- System 2 (Planner): Google Jules — global architecture, never writes production code
- System 1 (Executor): Claude Code — local implementation
- Orchestration: SKILL.md defines the delegation protocol
- State: STATE.md (current), PROJECT.md (project definition)
- Configuration: mise.toml (Toolchain versions)

## Directories
- `src/app/` — Next.js App Router (Pages, Layouts, API Routes)
- `src/components/ui/` — Shared UI Primitives (shadcn/ui)
- `src/components/features/` — Feature components (character/, plot/, editor/)
- `src/lib/ai/` — AI Integration (Vercel AI SDK Wrapper)
- `src/lib/mcp/` — MCP Protocol Implementation
- `src/server/` — Server-only Code (DB, Services)
- `agent_docs/` — Detailed architecture documentation
- `plans/` — Implementation plans (created by Plan Mode)

## Commands
```bash
npm run dev            # Start Dev-Server (Port 3000)
npm run build          # Production Build
npm run lint           # Run ESLint
npm run lint:fix       # ESLint auto-fix
npm run format         # Format with Prettier
npm run typecheck      # TypeScript type checking
npm run test           # Jest Unit Tests
npm run test:coverage  # Tests with coverage report
npm run ci             # Full local CI check
```

## Conventions
- Use Named Exports, no Default Exports
- Components: PascalCase filenames (UserCard.tsx)
- All DB queries via `src/server/db/`
- Type annotations required on all functions
- Test files next to source code: `Component.test.tsx`
- `cn()` from `@/lib/utils` for conditional ClassNames
- Conventional Commits: feat:, fix:, chore:, docs:, refactor:
- Branch naming: feature/, fix/, chore/, docs/

## Forbidden
- NEVER read .env files or output their contents
- NEVER commit directly to main — always use feature branches
- NEVER modify migration files after commit
- NO new dependencies without explicit discussion
- NEVER modify STATE.md or SKILL.md without consultation

## Context
For details see:
- `agent_docs/architecture.md` — JANUS Dual-Cognition Architecture
- `agent_docs/testing.md` — Test patterns and requirements
- `agent_docs/narrative-engine.md` — Novel Engine Documentation
- `STATE.md` — Current project state
- `SKILL.md` — Orchestration protocol
