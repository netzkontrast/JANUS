# REQUIREMENTS: The Ouroboros Architecture

**Goal:** Establish a persistent, self-updating autonomous artificial intelligence system deployed on Vercel infrastructure.

## Phase 1: Architectural Refactoring & Initialization (Current)
*   **Documentation:**
    *   [x] Completely rewrite `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, and `README.md` to establish the new Ouroboros architecture.
    *   [x] Refactor `AGENTS.md` to define TinyClaw as the persistent System 2 Orchestrator, leveraging Google Jules via MCP.
    *   [x] Update `STATE.md` to document the fundamental shift away from `zeroclaw` and `mise` to Vercel and `TinyClaw`.
*   **Infrastructure Teardown:**
    *   [x] Remove all references to the legacy Rust-based `zeroclaw` framework, `Gemini-CLI`, and `mise.toml`.
*   **Initial Scaffolding:**
    *   [ ] Initialize a foundational Next.js application structure (e.g., `package.json`, `tsconfig.json`).
    *   [ ] Implement basic Vercel-ready structure, including the `src/` directory for TinyClaw agents.
    *   [ ] Establish the basic structure for the `Observer`, `Architect`, and `Verifier` agents within the TinyClaw swarm.
    *   [ ] Set up the initial framework for Vercel Workflows and Vercel Sandboxes.
*   **Google Jules MCP Integration:**
    *   [ ] Scaffold the `google-jules-mcp` client integration within the Vercel app to enable programmatic task delegation to Jules.

## Phase 2: Autonomous CI/CD Execution Loop (Planned)
*   **Diagnostic Observation:**
    *   Implement the Observer Agent to monitor Vercel application logs and external inputs via Vercel Workflows.
*   **Delegation (Asynchronous Planning):**
    *   Enable the Architect Agent to formulate hypotheses and invoke `jules_create_task` via the MCP server.
*   **Execution & Ground Truth Validation:**
    *   Enable the Architect Agent to review and approve execution plans from Jules (`jules_approve_plan`).
    *   Configure webhooks to notify the Vercel application of new PR creations by Jules.
    *   Implement the Verifier Agent to spin up a Vercel Sandbox and execute end-to-end tests against the Vercel Preview URL.
*   **Integration:**
    *   Automate the PR merge process if the Sandbox validation passes, triggering a Production Deployment and system rebirth.

## Phase 3: Optimization and Context Management (Future)
*   **Context Compaction:** Implement TinyClaw's 4-layer context compaction pipeline (L0/L1/L2 digests) to reduce token weight.
*   **Adaptive Memory:** Implement the 3-layer adaptive memory system (episodic logs, semantic vector mapping, temporal decay).
*   **Semantic Routing:** Integrate the AI Gateway to route tasks dynamically between cost-effective and high-tier models.
*   **Runtime Security:** Deploy the SHIELD.md engine to enforce anti-malware protection and active threat parsing within Sandboxes.