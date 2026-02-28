# ROADMAP: The Ouroboros Architecture

**Current Phase: Phase 1 - Scaffolding the Vercel/TinyClaw Orchestrator**
*   **Goal:** Establish the fundamental Vercel Next.js application, configure TinyClaw agents, and define the Google Jules MCP integration.
*   **Status:** In Progress
*   **Milestones:**
    *   [x] Complete Refactoring of GSD Foundation Documents (`README.md`, `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`).
    *   [x] Remove obsolete `zeroclaw` and `mise` infrastructure.
    *   [ ] Scaffold Next.js application structure with `package.json` and `tsconfig.json`.
    *   [ ] Implement the basic TinyClaw agent framework (`Observer`, `Architect`, `Verifier`).
    *   [ ] Define the integration of `google-jules-mcp` within Vercel Workflows.
    *   [ ] Deploy the initial scaffolding to Vercel and assign the first autonomous "Vision" task.

**Upcoming: Phase 2 - Establishing the Autonomous CI/CD Loop**
*   **Goal:** Enable TinyClaw to autonomously delegate tasks to Google Jules, monitor progress, and validate the resulting Pull Requests using Vercel Sandboxes.
*   **Planned Milestones:**
    *   Implement webhook listeners in Next.js to receive GitHub PR events.
    *   Configure Vercel Sandbox provisioning for the Verifier Agent to run end-to-end tests against Preview Deployments.
    *   Establish the complete `jules_create_task` -> `jules_approve_plan` -> `PR Creation` -> `Sandbox Validation` -> `PR Merge` workflow.
    *   Finalize the `STATE.md` update logic upon successful deployment of the new system iteration.

**Future: Phase 3 - Dynamic Scaling and Cognitive Optimization**
*   **Goal:** Enhance the system's efficiency, cognitive load management, and resilience.
*   **Planned Milestones:**
    *   Implement TinyClaw's 4-layer context compaction (L0/L1/L2 digests) to minimize API token consumption.
    *   Integrate Vercel Fluid Compute and AI Gateway for semantic routing of simpler tasks to cost-effective models.
    *   Establish the temporal decay memory system to allow the system to "forget" obsolete historical data organically.
    *   Deploy the SHIELD.md runtime malware enforcement engine to protect against malicious inputs or hallucinatory outputs.
