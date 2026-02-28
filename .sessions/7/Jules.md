User provided a research report on AI orchestration frameworks, which concluded that interpreted systems (like the previously planned Gemini-CLI) are unsuitable for the Janus System 1 execution tier due to memory usage, latency, and context degradation.
The report definitively recommends transitioning to compiled, memory-safe, deterministic systems, specifically "ZeroClaw" (Rust-based).

I was instructed to complete the architectural pivot from Gemini-CLI to ZeroClaw.

Actions taken:
1. Updated `PROJECT.md`, `README.md`, `ROADMAP.md` and `AGENTS.md` to establish ZeroClaw as the official System 1 execution engine, removing references to the legacy Gemini-CLI.
2. Updated `docs/jules_evolution_report.md` to note the completion of the research task and the decision to adopt ZeroClaw based on the architectural evaluation.
3. Renamed `docs/gemini_cli_strategy.md` to `docs/zeroclaw_strategy.md` and significantly rewrote its contents to emphasize ZeroClaw's compiled Rust nature, <5MB footprint, <10ms startup latency, stateless SQLite/FTS5 memory, and deterministic trait-driven execution.
4. Updated `docs/janus_architecture.md` and `.private/jules/inbox/dmct_notes.md` to incorporate the ZeroClaw terminology and details.
5. Updated `mise.toml` to remove the `@google/gemini-cli` npm dependency and changed the `[tasks.gemini]` description and command to delegate to `zeroclaw`.
6. Updated `STATE.md` to document the completed architectural pivot.