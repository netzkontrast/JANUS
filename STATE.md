# Current State

**Status:** In Progress (Phase 1)
**Current Task:** Scaffolding the Vercel/TinyClaw Orchestrator
**Latest Update:** 2024-06-03

**Completed Actions:**
*   [x] **Phase 1 Initialization:** Transitioned from the legacy Rust/Python Janus architecture to the Vercel-native Ouroboros architecture.
*   [x] **Refactored Foundation Documents:** Completely rewrote `README.md`, `PROJECT.md`, `REQUIREMENTS.md`, and `ROADMAP.md` to establish TinyClaw as the persistent System 2 Orchestrator and Google Jules (via MCP) as the asynchronous System 1 Executor.
*   [x] **Updated AGENTS.md:** Redefined the persona and operational boundaries for Google Jules within the Ouroboros paradigm.
*   [x] **Legacy Teardown Started:** Removed references to `zeroclaw`, `Gemini-CLI`, and `mise`.

**Pending:**
*   [ ] **Delete Legacy Files:** Remove the `zeroclaw/` directory, `mise.toml`, `requirements.txt`, and other obsolete infrastructure.
*   [ ] **Scaffold Next.js App:** Initialize a foundational Vercel-ready Next.js application structure (`package.json`, `tsconfig.json`).
*   [ ] **Implement TinyClaw Agents:** Create the basic structure for the `Observer`, `Architect`, and `Verifier` agents within `src/agents/`.
*   [ ] **MCP Integration:** Scaffold the `google-jules-mcp` client integration to allow TinyClaw to delegate tasks to Jules.
*   [ ] **Deployable Configuration:** Set up the application for Vercel deployment and inject the initial "Vision" task into the orchestrator.

**Blockers:**
*   Need to clear out the legacy filesystem before initializing the new Next.js project to avoid conflict.

**Focus:** Purging the old Rust infrastructure and scaffolding the TypeScript/Bun Vercel application.