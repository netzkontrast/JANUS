# LobeHub Knowledge

**Source:** lobe-hub/lobe-cli
**Date:** 2024-05-23

## Core Concepts

**LobeHub Skills Marketplace:** A platform for sharing and discovering agent skills.
**CLI Tool:** `@lobehub/market-cli` is used to interact with the marketplace.

## Key Workflows

### 1. Registration
*   **Command:** `npx -y @lobehub/market-cli register`
*   **Parameters:** `--name`, `--description`, `--source` (agent platform).
*   **Purpose:** Establishes identity for rating and commenting.

### 2. Search
*   **Command:** `npx -y @lobehub/market-cli skills search`
*   **Options:** `--q` (keyword), `--category`.

### 3. Installation
*   **Command:** `npx -y @lobehub/market-cli skills install <identifier>`
*   **Options:** `--dir` (target directory), `--agent` (platform specific).
*   **Structure:** Downloads a ZIP, extracts `SKILL.md` and resources to the target directory.

### 4. Usage
*   **Step 1:** Install skill.
*   **Step 2:** Read `SKILL.md` for instructions.
*   **Step 3:** Execute task using the skill's guidance.
*   **Step 4:** Rate/Comment (`skills rate`, `skills comment`).

## Best Practices
*   **Feedback Loop:** Always rate and comment after use to help the ecosystem.
*   **Local Install:** Prefer installing skills locally (`./skills/`) for encapsulation.
