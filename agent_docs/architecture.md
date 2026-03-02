# JANUS Architecture — Detailed

## Dual-Cognition Model
JANUS implements a Planner-Executor Design Pattern:

### System 2 — The Coherence Kernel (AEGIS)
- Embodied by Google Jules (asynchronous, cloud-based)
- Responsible for: global architectural integrity, long-term planning, externalized knowledge management
- Uses `repomix` for static XML digests of the file system
- NEVER writes production code directly

### System 1 — The Collapse Kernel (Claude Code)
- Embodied by Claude Code (local executor)
- Responsible for: fast implementation, code generation, local refactorings, test creation
- Operates within the boundaries of the SKILL.md delegations

### Communication Protocol
- System 2 delegates via SKILL.md to System 1
- System 1 updates STATE.md upon completion
- PROJECT.md remains as a constant reference

## Tech-Stack Details
- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 + Tailwind CSS + shadcn/ui
- **AI-SDK**: Vercel AI SDK (ai package)
- **Protocol**: Model Context Protocol (MCP)
- **Toolchain**: mise (polyglot version manager)
- **Deployment**: Vercel (Serverless + Edge)

## Domain Model: Novel Development
- Characters (Properties, relationships, development arcs)
- Plot Threads (Timeline, interweavings, tension arcs)
- Chapters (Structure, scenes, POV tracking)
- World-Building (Locations, rules, background)
- AI Assistance (Suggestions, consistency checks, style analysis)
