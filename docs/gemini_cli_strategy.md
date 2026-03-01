# Gemini CLI Strategy: System 1 Implementation

**Objective:** Implement the `Gemini-CLI` (System 1) to serve as the fast, reactive execution arm of the Janus System.

## 1. Core Responsibilities

- **Execution:** Accept atomic tasks from System 2 (Jules).
- **Isolation:** Run in a sandboxed environment (or simulated sandbox).
- **Context:** Operate with a minimal, task-specific context window.
- **Verification:** Run tests and return only verified code or error logs.

## 2. Technical Architecture

### 2.1 The CLI Interface

A Python-based CLI tool (`gemini-cli`) that accepts arguments for:

- `--task`: The natural language instruction.
- `--context`: Path to the L2 context file (source code).
- `--verify`: Command to run for verification.

### 2.2 The "Jules" Wrapper

A bash or python script (`jules`) that orchestrates the `gemini-cli`:

- Manages parallel execution (using `asyncio` or `subprocess`).
- Handles context injection (reading `repomix` output).
- Aggregates results.

## 3. Implementation Plan (Future Phase)

### Step 1: Prototype `gemini-cli`

- Create a simple Python script that uses the Google Gemini API.
- Implement basic prompt construction (System Prompt + Task + Context).
- Implement file I/O to read code and write changes.

### Step 2: Integrate `mise`

- Ensure `gemini-cli` can be invoked via `mise run gemini`.

### Step 3: Implement `jules` Orchestrator

- Create the `jules` CLI tool to parse `task_plan.xml` and dispatch tasks to `gemini-cli`.

## 4. Immediate Next Steps

1.  Set up a Google Cloud Project (or use existing) with Vertex AI API enabled.
2.  Obtain API Keys (if running locally) or configure ADC (Application Default Credentials).
3.  Draft the `gemini-cli` Python script in `tools/gemini-cli/`.
