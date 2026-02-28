#!/usr/bin/env bash
set -e

echo "Running Repomix..."
npx repomix --config repomix.config.json

echo ""
echo "==== Digest Token Summary ===="

OUTPUT_FILE=".planning/context_digest.xml"

if [ -f "$OUTPUT_FILE" ]; then
    SIZE_BYTES=$(wc -c < "$OUTPUT_FILE")
    WORDS=$(wc -w < "$OUTPUT_FILE")

    echo "Digest file created at: $OUTPUT_FILE"
    echo "Size: $SIZE_BYTES bytes"
    echo "Words: $WORDS"
else
    echo "Error: $OUTPUT_FILE not found."
    exit 1
fi
