# Hierarchical Digests (Context Engineering)

**Status:** Concept
**Goal:** Prevent token collapse by abstracting filesystem views.

## Levels

### L0: Abstract (Index View)

- **Purpose:** Provide a structural overview of the repository.
- **Content:**
  - List of directories and filenames.
  - File types (e.g., Python, Markdown).
  - Generated one-sentence summary for each node.
- **Token Cost:** Minimal (approx. 100 tokens/node).
- **Usage:** Initial exploration, high-level planning.

### L1: Overview (Structural Level)

- **Purpose:** Understand architecture and interfaces without implementation details.
- **Content:**
  - Class names.
  - Method signatures (arguments, return types).
  - Import statements.
  - Top-level documentation (docstrings).
  - **Excluded:** Function bodies (implementation logic).
- **Tooling:** Tree-sitter (parsing AST).
- **Token Cost:** Moderate (approx. 30% of full file).
- **Usage:** API integration, dependency analysis.

### L2: Details (Full Content)

- **Purpose:** Edit code, fix bugs, implement features.
- **Content:** Full source code.
- **Token Cost:** High (100%).
- **Usage:** Only loaded for the specific files identified as necessary by L0/L1 analysis.

## Implementation Strategy

- **Tools:** Write Python/Node scripts to generate these views on demand.
- **Integration:** Use these scripts in the `context-tailoring` skill (DMCT).
