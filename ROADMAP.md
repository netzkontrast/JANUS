# Roadmap

**Q2 2024: Phase 1 - Janus Initialization (Current)**
*   **Goal:** Establish the foundational infrastructure (GSD, Transactional Memory, Documentation).
*   **Status:** In Progress (Session 1).
*   **Milestones:**
    *   [x] Session directory structure created.
    *   [x] Core GSD documents created.
    *   [ ] `AGENTS.md` and templates finalized.
    *   [ ] Private workspace established.
    *   [ ] Skills template created.
    *   [ ] Initial documentation written.

**Q2 2024: Phase 2 - Core Capabilities (Ouroboros Scaffold)**
*   **Goal:** Enable persistent, durable execution and self-updating mechanics on Vercel.
*   **Planned:**
    *   Initialize TinyClaw swarm roles (Observer, Architect, Verifier).
    *   Set up durable orchestration with Vercel Workflows.
    *   Configure Vercel Sandboxes for execution isolation.
    *   Implement MCP interface for System 2 (Jules) interactions.

**Q3 2024: Phase 3 - Autonomous Operation**
*   **Goal:** Full System 2 (Jules) / System 1 (TinyClaw) orchestration for self-updating.
*   **Planned:**
    *   Automated CI/CD loop (Ground Truth validation of PRs).
    *   Context compaction pipeline (L0/L1/L2 digests) running via scheduled workflows.
    *   Temporal decay of episodic memory in `.sessions/`.
