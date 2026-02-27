# Dynamic Mutual Context Tailoring (DMCT) - Notes

**Status:** Draft / Concept
**Goal:** Enable Jules (System 2) and Gemini (System 1) to iteratively tailor their context to the absolute minimum required for a task, validated by executable code.

## Core Idea
Traditional LLMs suffer from "context stuffing." DMCT solves this by forcing a negotiation:
1.  **Hypothesis (Jules):** "I need X context to solve Y."
2.  **Minimum Slice (Jules):** Extracts a tiny L1 digest (signatures only).
3.  **Validation (Gemini):** Tries to solve Y with ONLY that slice.
4.  **Feedback (Gemini):** If it fails (ImportError, etc.), Gemini requests *specific* missing pieces (e.g., "I need file Z").
5.  **Refinement (Jules):** Adds Z to the context.
6.  **Success:** The final context is the "Ground Truth" for that type of task.

## Implementation Ideas
*   **Script:** A Python script `dmct.py` that takes a task description and an initial context list.
*   **Loop:** It runs a sub-agent (Gemini) with restricted access.
*   **Error Parsing:** It parses stderr from the sub-agent to identify missing modules/definitions.
*   **Knowledge Graph:** Updates a local `context_graph.json` mapping tasks to minimal file sets.

## Integration
This should eventually become a core skill: `skills/context-tailoring/`.
