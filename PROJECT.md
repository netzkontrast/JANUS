# JANUS: Dual-Agent Orchestration System

**Vision:**
Janus is an autonomous, self-orchestrating software development environment designed for "Greenfield" projects. It leverages a dual-agent architecture (System 2: Google Jules, System 1: Gemini-CLI) to solve complex coding tasks with high reliability and minimal context decay.

**Core Philosophy:**
*   **System 2 (Jules):** Slow, deliberative, strategic. Manages architecture, planning, and global state. Interacts via Model Context Protocol (MCP).
*   **System 1 (TinyClaw Swarm):** Fast, reactive, experimental. Executes isolated tasks, validates hypotheses with code, and tailors context. Runs as a persistent agent application on Vercel.
*   **Transactional Memory:** All actions are logged immutably.
*   **Get Shit Done (GSD):** Strict separation of planning and execution.
*   **Ouroboros Architecture:** The system perceives its environment, diagnoses flaws, delegates architectural updates to System 2, and self-deploys via Vercel Workflows and Sandboxes.

**Key Components:**
*   **GSD Framework:** `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`.
*   **Agent Skills:** Standardized capabilities in `/skills/`.
*   **DMCT:** Dynamic Mutual Context Tailoring for precise context management.
*   **Private Workspace:** Internal reasoning and personality management.

**Constraints:**
*   **Language:** TypeScript, Node.js 22+ (via Mise).
*   **Infrastructure:** Vercel (Workflows, Sandboxes, Fluid Compute).
*   **Testing:** All changes must be verified by executable tests, utilizing the "Ground Truth" algorithm in Vercel Sandboxes.
*   **Documentation:** All architectural decisions must be documented.
