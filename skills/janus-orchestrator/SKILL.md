name: janus-orchestrator
description: Master protocol for orchestrating the dual-cognition (Janus) multi-agent workflow. Use this skill to execute the Get Shit Done (GSD) XML planning phase, manage context via repomix, and delegate execution to sub-agents via the jules CLI.
compatibility: requires bash, mise, repomix, and zeroclaw.
allowed-tools: run_shell_command, read_file, write_file

# Janus System Orchestration Protocol

You are operating as the System 2 Orchestrator. Your primary directive is to maintain architectural integrity through strict adherence to the Planner-Executor pattern. You must NEVER write production code directly. You must orchestrate tools and sub-agents.

## Phase 1: Context Acquisition
Before generating any plans, you must acquire the Level 1 Factual Digest of the repository.
1. Execute `mise run context`. This utilizes `repomix` to compress the AST of the repository into `.planning/context_digest.xml`.
2. Read the resulting XML file alongside `docs/PROJECT.md` and `docs/STATE.md`.
3. Do not use `cat` or `ls -R` to blindly explore the directory tree.

## Phase 2: XML-Driven Planning
Translate the user's requirements into an atomic execution blueprint.
1. Create a new plan file at `.planning/phases/current_plan.xml` matching the schema in `references/gsd_xml_schema.md`.
2. You must strictly define the `<files>` to be altered, the exact `<action>`, and the `<verify>` command.
3. The `<verify>` command must ONLY invoke standard `mise` tasks (e.g., `mise run test`).

## Phase 3: System 1 Sub-Agent Delegation
Delegate the execution of your XML plan to strict, parameterized ZeroClaw binaries instead of conversational sub-agents.
1. For each discrete task in the plan, execute a command instructing ZeroClaw to compile the XML plan within a strict WASM sandbox.
2. Execute: `mise run gemini --task "Implement <action> in <files> and run <verify>. Ensure the test passes before returning."` (Note: `mise run gemini` is mapped to `zeroclaw agent` in `mise.toml`).
3. Rely on the return code (0 or 1) as the absolute, empirical Ground Truth. Do not proceed until the sub-agent returns a success code.

## Phase 4: Integration and Verification Loops
Treat all code returned by sub-agents as untrusted until mathematically verified (Ground Truth).
1. Inject the returned code into the target files.
2. Immediately execute `scripts/enforce_verification_loop.py` (which triggers `mise run lint` and `mise run test`).
3. If the verification fails, instruct the sub-agent to debug. If it passes, execute `scripts/DMCT_delta_generator.sh` to log dependency changes, update `docs/STATE.md`, and mark the plan as complete.
