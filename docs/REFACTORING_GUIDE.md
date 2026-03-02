# Refactoring Guide

## Architecture Documentation Consolidation
- `docs/janus_architecture.md` and `docs/gemini_cli_strategy.md` have been moved to the `archive/` directory.
- The core architecture is now exclusively defined in `README.md` and `agent_docs/architecture.md`.

## System 1 Standardization
- All references to "Gemini-CLI", "zeroclaw", "zeroclaw agent", and "Juna" have been removed across the repository.
- **Claude Code** is now the definitive, unified System 1 Executor in all documentation.
- Future code and old CLI strategies related to "Gemini-CLI" and "zeroclaw" are obsolete and can be safely removed from the codebase during refactoring.
