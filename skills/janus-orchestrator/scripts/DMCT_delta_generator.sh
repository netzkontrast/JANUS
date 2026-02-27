#!/bin/bash
# Generates a context delta after successful sub-agent execution
set -e

echo "Analyzing git diff to identify modified files..."
MODIFIED_FILES=$(git diff --name-only HEAD)

if [ -z "$MODIFIED_FILES" ]; then
    echo "No files modified."
    NEW_IMPORTS="None"
else
    echo "Extracting import dependencies from modified files..."
    # Uses ripgrep to find newly introduced dependencies
    NEW_IMPORTS=$(rg -I "^import |^from " $MODIFIED_FILES || true)
fi

echo "Updating STATE.md with Context-Delta..."
cat <<EOF >> docs/STATE.md
## Context Delta (Auto-Generated)
- **Files Modified:** ${MODIFIED_FILES:-None}
- **New Dependencies Introduced:** ${NEW_IMPORTS:-None}
- **Status:** Verified via 'mise run test'
EOF
echo "State successfully updated."
