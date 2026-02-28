# JANUS: Dual-Agent Orchestration System

**Vision:**
Janus is an autonomous, self-orchestrating software development environment designed for "Greenfield" projects. It leverages a dual-agent architecture (System 2: Google Jules, System 1: zeroclaw) to solve complex coding tasks with high reliability and minimal context decay.

**Core Philosophy:**
*   **System 2 (Jules):** Slow, deliberative, strategic. Manages architecture, planning, and global state.
*   **System 1 (zeroclaw):** Fast, reactive, memory-safe, deterministic. A compiled Rust executor that handles isolated tasks, validates hypotheses with code, and tailors context.
*   **Transactional Memory:** All actions are logged immutably.
*   **Get Shit Done (GSD):** Strict separation of planning and execution.

**Key Components:**
*   **GSD Framework:** `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`.
*   **Agent Skills:** Standardized capabilities in `/skills/`.
*   **DMCT:** Dynamic Mutual Context Tailoring for precise context management.
*   **Private Workspace:** Internal reasoning and personality management.

**Constraints:**
*   **Language:** Python 3.12+, Node.js 22+ (via Mise).
*   **Testing:** All changes must be verified by executable tests.
*   **Documentation:** All architectural decisions must be documented.
