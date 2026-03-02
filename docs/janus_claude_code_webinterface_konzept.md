# Concept: JANUS AI Web Interface (Claude Code Integration)

## 1. Goal
Provide a visual, interactive interface to manage the JANUS Dual-Agent system, specifically integrating **Claude Code** (System 1) into a dashboard.

## 2. Architecture Updates
The frontend will leverage the established Next.js 15 (App Router) structure.

- **System 1 Executor**: We will replace legacy CLI references with direct MCP hooks targeting `Claude Code` for fast, localized generation tasks.

## 3. Implementation Plan
- Expand `src/components/features/` with an Agent Dashboard.
- Connect the frontend securely to backend MCP services to track and execute `Claude Code` runs.
