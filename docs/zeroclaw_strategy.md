# zeroclaw Strategy: System 1 Implementation

**Objective:** Deploy `zeroclaw` (System 1) to serve as the fast, deterministic, and highly efficient execution arm of the Janus System.

## 1. Core Responsibilities
*   **Execution:** Accept atomic XML blueprints/tasks from System 2 (Jules).
*   **Isolation:** Run in a strict, deterministic workspace with OS-level sandboxing (e.g., seccomp or Landlock).
*   **Context:** Ingest minimalistic, task-specific L2 context immediately upon boot using its zero-dependency SQLite/FTS5 memory.
*   **Verification:** Execute standard aliases like `mise run test` to return verified ground truth or strict error logs.

## 2. Technical Architecture

### 2.1 The Executor Tier (ZeroClaw)
A pure Rust, compiled static binary (`zeroclaw`) featuring:
*   **Memory Efficiency:** <5MB RAM usage via Arena allocation, satisfying stringent thermodynamic efficiency limits.
*   **Extreme Latency:** <10ms cold start time, dropping below the human chronoception limit, ensuring swarm execution feels seamless.
*   **Determinism:** Trait-driven monomorphization eliminates garbage collection pauses, making execution entirely predictable.

### 2.2 The Orchestrator
The `jules` CLI orchestrates the parallel swarm:
*   Generates a task-directed acyclic graph (DAG) via XML blueprints.
*   Spawns dozens of ephemeral `zeroclaw` instances simultaneously (e.g., `jules --parallel 10`).
*   Guarantees all sub-agents operate within identical `mise` managed environments.

## 3. Implementation Plan

### Step 1: Replace Legacy Tools
*   Discard interpreted, memory-bloated Node/Python agents and transition strictly to the `zeroclaw` compiled binary.
*   Update `mise.toml` configurations to invoke `zeroclaw`.

### Step 2: Validate the Sandboxing Model
*   Test and confirm that `zeroclaw` properly interfaces with the underlying sandbox configurations (seccomp).

### Step 3: Swarm Verification
*   Execute tests confirming `jules` successfully orchestrates multi-agent parallel flows without overwhelming local or cloud VMs.

## 4. Future Scaling Consideration: NullClaw
*   For unprecedented scale (e.g., hundreds of parallel tasks), consider switching the executor to `NullClaw` (Zig-based, 1MB footprint, <2ms cold start) using identical vtable/provider paradigms.
