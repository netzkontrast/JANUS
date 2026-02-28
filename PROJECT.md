# PROJECT: The Ouroboros Architecture

**Vision:**
The Ouroboros Architecture establishes a persistent, self-updating autonomous artificial intelligence system deployed on Vercel infrastructure. It is engineered to orchestrate the continuous evolution of its own source code through the deployment of highly specialized, asynchronous sub-agents.

**Core Philosophy:**
The system abandons monolithic AI execution to prevent "Context Rot" and catastrophic architectural degradation. Instead, it relies on "Functional Multiplicity"—a cooperative swarm of specialized agents operating within strictly defined boundaries and ephemeral cloud environments.

*   **System 2 (The TinyClaw Orchestrator):**
    Running continuously on Vercel Workflows, TinyClaw acts as the persistent, state-aware "Slow Thinking" orchestrator. It manages the overarching `PROJECT.md`, `ROADMAP.md`, and `STATE.md`, maintaining the macro-architectural context. It does *not* write code directly.

*   **System 1 (Google Jules via MCP):**
    When TinyClaw identifies a need for complex structural modification, it delegates the heavy lifting to Google Jules. Operating entirely asynchronously in an isolated Google Cloud VM, Jules clones the target repository, plans the changes, executes the code, and submits Pull Requests back to the main branch.

*   **Executable Truth Validation (CodeAct):**
    The system relies entirely on deterministic outputs—compiler errors, test suite results, and Vercel Preview Deployments—rather than probabilistic LLM guesswork to validate the integrity of new code before merging PRs.

**Key Components:**
*   **Vercel Workflows:** Provide the durable orchestration necessary to suspend execution indefinitely while waiting for asynchronous Jules tasks or external webhooks.
*   **Vercel Sandboxes:** Isolated microVMs used by the Verifier Agent to securely execute untrusted testing scripts against Preview Deployments.
*   **TinyClaw Swarm:** A multi-agent framework comprising Observer, Architect, and Verifier roles.
*   **Google Jules MCP:** The standardized integration interface (`google-jules-mcp`) allowing TinyClaw to programmatically trigger, monitor, and approve Jules's architectural plans.

**Constraints:**
*   **Language:** Strict adherence to TypeScript running on Bun (for Vercel native alignment).
*   **Isolation:** All code compilation and testing must occur strictly within Vercel Sandboxes or Jules's isolated cloud VM.
*   **Documentation:** All architectural decisions, execution plans, and states must be immutably recorded in the externalized GSD graph (`STATE.md`, `REQUIREMENTS.md`, `.planning/`).
