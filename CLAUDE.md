# CLAUDE.md — JANUS Project

## Project
JANUS is a Dual-Cognition AI Orchestration System for AI-assisted novel development.
Tech Stack: Next.js 15, React 19, TypeScript (strict), Tailwind CSS, Vercel AI SDK, Model Context Protocol (MCP).

Working Language: German for documentation and comments.
Code and variable names: English.

## Architecture
- System 2 (Planner): Google Jules — global architecture, never writes production code directly.
- System 1 (Executor): `zeroclaw` / Claude Code — local implementation and experimental tasks.
- Orchestration: `SKILL.md` defines delegation protocols.
- State: `STATE.md` (current status), `PROJECT.md` (project definition).
- Configuration: `mise.toml` (toolchain versions).

## Directories
- `src/app/` — Next.js App Router (Pages, Layouts, API Routes)
- `src/components/ui/` — Shared UI Primitives (shadcn/ui)
- `src/components/features/` — Feature components (character/, plot/, editor/)
- `src/lib/ai/` — AI Integration (Vercel AI SDK Wrapper)
- `src/lib/mcp/` — MCP Protocol Implementation
- `src/server/` — Server-only code (DB, Services)
- `agent_docs/` — Detailed architecture documentation
- `plans/` — Implementation plans (created by Plan Mode)

## Commands
```bash
npm run dev            # Start dev server (Port 3000)
npm run build          # Production build
npm run lint           # Run ESLint
npm run lint:fix       # ESLint auto-fix
npm run format         # Format with Prettier
npm run typecheck      # TypeScript type checking
npm run test           # Jest Unit-Tests
npm run test:coverage  # Tests with coverage report
npm run ci             # Full CI check locally
```

## Conventions
- Use Named Exports, no Default Exports.
- Components: PascalCase filenames (e.g., `UserCard.tsx`).
- All DB queries must go through `src/server/db/`.
- Type annotations are required on all functions.
- Test files reside next to source code: `Component.test.tsx`.
- `cn()` from `@/lib/utils` for conditional classNames.
- Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`
- Branch naming: `feature/`, `fix/`, `chore/`, `docs/`

## Prohibited Actions
- NEVER read or output `.env` files.
- NEVER commit directly to `main` — always use a feature branch.
- NEVER modify migration files after commit.
- NO new dependencies without explicit discussion.
- NEVER modify `STATE.md` or `SKILL.md` without consultation.

## Context
For more details, see:
- `agent_docs/architecture.md` — JANUS Dual-Cognition Architecture
- `agent_docs/testing.md` — Testing patterns and requirements
- `agent_docs/narrative-engine.md` — Novel Engine documentation
- `STATE.md` — Current project state
- `SKILL.md` — Orchestration protocol
