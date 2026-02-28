# JANUS: The Ouroboros Architecture

**Janus** is a persistent, self-updating autonomous software engineering ecosystem deployed on Vercel. It leverages the "Ouroboros" architecture to combine the durable, stateful execution of the **TinyClaw** framework with the immense, asynchronous cognitive power of **Google Jules**.

The system is designed to fundamentally solve "Context Rot" and the fragility of monolithic AI agents by adopting "Functional Multiplicity" — orchestrating specialized sub-agents across isolated cloud environments.

---

## 1. Cognitive Dualism & Functional Multiplicity

Janus abandons the brittle, single-agent paradigm in favor of a specialized swarm:

*   **System 2 (TinyClaw on Vercel): The Persistent Orchestrator**
    The core application runs continuously on Vercel, utilizing Vercel Workflows for durable execution. It monitors the environment, maintains the long-term knowledge hypergraph (L0/L1/L2 digests), and defines macroscopic objectives. It does *not* write complex code itself.
*   **System 1 (Google Jules via MCP): The Asynchronous Executor**
    When TinyClaw determines a structural update or complex refactoring is required, it delegates the task programmatically to Google Jules via the Model Context Protocol (MCP). Jules spins up an isolated Google Cloud VM, clones the repository, executes the task, tests the code, and submits a Pull Request back to the main repository.

## 2. The GSD Externalized Memory Graph

To maintain absolute coherence across ephemeral serverless executions, Janus relies on a strict externalized memory structure:

*   **`PROJECT.md`:** The fundamental, immutable vision and architectural constraints (The Ouroboros Paradigm).
*   **`REQUIREMENTS.md`:** The detailed, hierarchical list of functional system requirements.
*   **`ROADMAP.md`:** The macroscopic timeline of evolutionary phases and milestones.
*   **`STATE.md`:** Dynamic short-term memory, updated continually by the TinyClaw Orchestrator. It documents active workflows, PR states, and blockers.
*   **`.planning/`:** Execution plans drafted in `task_plan.xml` format.

## 3. The Autonomous CI/CD Loop

Janus evolves its own architecture through a deterministic four-phase lifecycle:

1.  **Diagnostic Observation:** TinyClaw (Observer Agent) continuously monitors logs and external inputs via Vercel Workflows.
2.  **Delegation (Asynchronous Planning):** Upon identifying an issue or improvement, TinyClaw formulates a hypothesis and invokes `jules_create_task` via MCP. Jules analyzes the entire codebase in its VM and returns a structural execution plan.
3.  **Execution & Ground Truth Validation:** TinyClaw reviews the plan (`jules_approve_plan`). Jules implements the code and opens a PR. Vercel automatically deploys a Preview URL. TinyClaw (Verifier Agent) spins up a Vercel Sandbox to run rigorous end-to-end tests against the preview.
4.  **Integration:** If validation passes, TinyClaw autonomously merges the PR. Vercel deploys to Production, and the system awakens in its newly evolved state.

## 4. Why Vercel & TinyClaw?

*   **Vercel Workflows:** Provide "durable orchestration," allowing the agent to survive serverless timeouts and wait asynchronously for Jules to finish executing tasks in the cloud.
*   **Vercel Sandboxes:** Firecracker microVMs that securely execute untrusted compilation scripts and validation tests without exposing the primary runtime.
*   **TinyClaw (TypeScript/Bun):** Offers a native Vercel alignment, 4-layer context compaction (combating Context Rot), and a robust multi-agent swarm architecture out-of-the-box.
