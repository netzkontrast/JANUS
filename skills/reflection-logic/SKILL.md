---
name: reflection-logic
description: Systematic reflection and session reporting. Analyzes source materials, evaluates architectural alignment, and synthesizes findings into structured reports. Inspired by scientific critical thinking patterns.
license: Apache-2.0
metadata:
  version: "1.0"
  author: "Jules (System 2)"
---

# Reflection Logic

## Overview
This skill provides a structured framework for reflecting on session activities, analyzing source materials, and generating comprehensive session reports. It adapts the rigorous evaluation methods of scientific critical thinking to the domain of software architecture and agent orchestration.

## When to Use This Skill
*   **Session Conclusion:** To synthesize a `Session_Report.md`.
*   **Source Analysis:** To critically evaluate new concepts or inputs (`sources/`).
*   **Self-Correction:** To review decisions against the `PROJECT.md` and `AGENTS.md` guidelines.
*   **Architecture Review:** To ensure alignment with the Janus architecture.

## Core Capabilities

### 1. Source Material Analysis
Systematically evaluate input documents (concepts, research reports, task descriptions).

**Evaluation Framework:**
1.  **Core Thesis:** What is the central argument or requirement?
2.  **Structural Integrity:** Is the document logically consistent?
3.  **Architectural Alignment:** Does it conflict with existing `PROJECT.md` or `AGENTS.md` directives?
    *   *Check:* Does it violate encapsulation?
    *   *Check:* Does it contradict the System 1/System 2 split?
4.  **Actionable Intelligence:** What specific tasks or constraints does it impose?

### 2. Session Reflection (The "Mirror")
Reflect on the agent's own performance during a session.

**Reflection Questions:**
1.  **Goal Achievement:** Did we meet the objectives in `REQUIREMENTS.md`?
2.  **Process Adherence:** Did we follow GSD (Plan -> Execute -> Verify)?
3.  **Tool Usage:** Did we use skills effectively (e.g., LobeHub CLI)?
4.  **Learning:** What new knowledge was acquired (e.g., new skills, patterns)?
5.  **Friction Points:** Where did the process stall or become ambiguous?

### 3. Session Reporting
Generate a structured report summarizing the session.

**Report Template (`Session_Report.md`):**
*   **Overview:** Date, Goal, Status.
*   **Input Analysis:** Summary of `sources/` and key directives.
*   **Architecture Updates:** Changes to `PROJECT.md`, `STATE.md`, etc.
*   **Skills Acquired:** New skills installed or created.
*   **Decisions:** Key architectural choices made (and why).
*   **Next Steps:** Immediate actions for the next session.

## Instructions

### How to Analyze Sources
1.  Read all files in `.sessions/<id>/sources/`.
2.  Identify the "Ground Truth" documents vs. "Context" documents.
3.  Extract key constraints and add them to `REQUIREMENTS.md` (if not already there).

### How to Generate a Session Report
1.  Run the reflection process (Capability 2).
2.  Compile findings into the `Session_Report.md` format.
3.  Store the report in `.sessions/<id>/Session_Report.md`.
4.  Update `STATE.md` with the "Latest Update" and "Completed Actions".

## Scripts
*   (Planned) `scripts/generate_report.py`: Automated generation of the report draft.
