# Knowledge: Agent Skills Standard

**Source:** agentskills.io
**Date:** 2024-05-23

## Core Concepts

**Definition:** Agent Skills are folders containing instructions (`SKILL.md`), scripts, and resources that extend an agent's capabilities. They are "procedural knowledge" packages.

**Structure:**
*   A skill is a directory.
*   Must contain a `SKILL.md` file.
*   Optional subdirectories:
    *   `scripts/`: Executable code (Python, Node, Bash).
    *   `references/`: Documentation, forms, templates.
    *   `assets/`: Static resources (images, data).

**Progressive Disclosure:**
This is a key mechanism to save tokens and context.
1.  **Discovery:** Agent sees only `name` and `description` (YAML Frontmatter).
2.  **Activation:** If relevant, the agent reads the full `SKILL.md`.
3.  **Execution:** Agent runs scripts or reads reference files only when needed.

## `SKILL.md` Format

**Frontmatter (YAML):**
```yaml
---
name: skill-name (lowercase, hyphens only)
description: What it does and WHEN to use it.
license: (Optional) e.g., Apache-2.0
compatibility: (Optional) e.g., Requires docker
metadata: (Optional) Key-value pairs
allowed-tools: (Optional, Experimental)
---
```

**Body (Markdown):**
*   Step-by-step instructions.
*   Examples.
*   Edge cases.
*   References to files in `scripts/`, `references/`, etc.

## Best Practices
*   **Encapsulation:** Keep everything needed for the skill inside its folder.
*   **Naming:** Clear, descriptive names (e.g., `pdf-processing`).
*   **Descriptions:** Focus on *when* to use the skill to help the agent decide.
*   **Simplicity:** Keep `SKILL.md` under 500 lines. Move details to `references/`.
*   **Validation:** Use `skills-ref validate` (conceptually) to check structure.
