# JANUS: Dual-Agent Orchestration System

**Janus** is an autonomous, self-orchestrating software development environment designed for "Greenfield" projects. It leverages a dual-agent architecture (System 1 & System 2) to solve complex coding tasks with high reliability and minimal context decay.

The fundamental goal of Janus is to combat "Context Rot" through rigorous documentation, temporal structuring, and CodeAct-driven truth validation, using a strict "Get Shit Done" (GSD) methodology.

---

## 1. Cognitive Dualism (The Janus Architecture)

At the core of the project lies the dual-agent interplay:

*   **System 2 (Jules): The Slow-Thinking Orchestrator**
    Jules is deliberate, reflexive, and strategic. Operating asynchronously, Jules’ primary responsibility is maintaining the global architecture, managing the system's state (`STATE.md`, `ROADMAP.md`), and orchestrating complex plans. Jules governs the environment and does not rush into writing code.
*   **System 1 (zeroclaw): The Fast-Thinking Executor**
    Replacing the legacy Gemini-CLI, `zeroclaw` acts as the reactive sub-agent infrastructure written in Rust. Operating with a <5MB memory footprint and <10ms startup latency, it provides memory-safe and deterministic execution. System 1 is instantiated for fast, isolated, parallel execution and experimental tasks. It operates in a "YOLO" mode, generating code, running tests, and validating hypotheses through compiler output (CodeAct), protecting the main context from irrelevant noise.

## 2. The GSD Externalized Memory Graph

To prevent hallucinations and context overload, Janus externalizes its memory into a strict Markdown graph:

*   **`PROJECT.md`:** The fundamental, mostly immutable vision and architectural constraints.
*   **`REQUIREMENTS.md`:** The detailed, hierarchical list of functional requirements.
*   **`ROADMAP.md`:** The macroscopic timeline of phases and milestones.
*   **`STATE.md`:** Dynamic short-term memory, updated at the end of every session. It documents immediate progress, decisions, and blockers.
*   **`.planning/`:** A directory where all execution plans are meticulously drafted using the `task_plan.xml` template before any code is executed.

## 3. Episodic Memory & Learning Loops

Janus governs the project over the dimension of time using specific learning rhythms to continuously self-improve:

1.  **Micro-Loop (Transactional - Every Session):** Every interaction, plan, and outcome is immutably logged in `.sessions/<id>/`. `STATE.md` is updated accordingly.
2.  **Meso-Loop (Reflective - Every 5 Sessions):** An analytical review of the last 5 sessions to identify systemic friction points, hallucination patterns, or missing knowledge, which are then abstracted into learning documents.
3.  **Macro-Loop (Archival - Every 10 Sessions):** Historical XML plans and obsolete state data are compressed and moved into an `/archive/` directory to prevent context poisoning.

## 4. Context Engineering & Dynamic Mutual Context Tailoring (DMCT)

To combat Context Rot, Janus employs sophisticated context engineering:

*   **Multi-Level Digests:** Using L0 (Abstract/Topology), L1 (Structural/Signatures), and L2 (Full Content) digests to locate relevant code efficiently without flooding the context window.
*   **DMCT:** When Jules delegates to the `zeroclaw agent` (System 1), it tailors the context to send only the precise, minimal subset (L1/L2) required for the task.
*   **Executable Validation (Ground Truth):** Conflicts in documentation or perspectives are resolved not by guessing, but by formulating hypotheses and instructing System 1 to write and execute a test script (`CodeAct`). Compiler and test outputs serve as the absolute truth.

## 5. Human Collaboration & Research

Janus is autonomous but recognizes its boundaries. It strategically engages the human user:
*   **As a Sounding Board:** For subjective business decisions or major architectural forks.
*   **For Deep Research:** When deep domain knowledge or specific API constraints fall outside of the repository's scope, Janus relies on human-provided context instead of hallucinating capabilities.
