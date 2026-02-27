---
name: create-skill
description: Template for creating new Agent Skills. Defines the standard structure and required metadata. Use this when you want to package a new capability.
license: Apache-2.0
compatibility: Requires agentskills.io format compliance.
metadata:
  version: "1.0"
  author: "Jules (System 2)"
---

# Create New Skill

## When to use this skill
Use this skill whenever you identify a reusable capability or process that should be encapsulated into a standardized format. This ensures consistency and makes the skill discoverable by other agents.

## Directory Structure
Create a new directory under `/skills/` with the name of your skill (lowercase, hyphens only).
Inside, create `SKILL.md` using the frontmatter above as a guide.

## Optional Components
*   **scripts/:** Place executable scripts (Python, Node.js, Bash) here. Ensure they are self-contained and documented.
*   **references/:** Place documentation, templates, or forms here.
*   **assets/:** Place static resources like images or data files here.

## Validation
Ideally, run `skills-ref validate ./your-skill-name` (conceptually) to ensure compliance with the agentskills.io specification.

## Example
```bash
mkdir -p skills/my-new-skill/scripts
# Create SKILL.md with frontmatter...
# Add scripts/my_script.py...
```
