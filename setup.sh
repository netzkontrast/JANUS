#!/usr/bin/env bash
set -e

echo "======================================"
echo " Setting up Jules-Ultra Environment"
echo "======================================"

# 1. Install Dependencies
echo "[1/4] Installing NPM dependencies..."
npm install

# 2. Create the Database & Index Initial Skills
echo "[2/4] Indexing initial skills into the local brain (SQLite)..."
npx tsx src/skill-indexer.ts

# 3. Setup the CLI binary
echo "[3/4] Linking Jules CLI (j)..."
chmod +x src/jules-cli.ts
# For local dev we rely on the npm script 'npm run j'
# Optionally users can alias j='npm run j --'

# 4. Display output
echo "[4/4] Setup Complete. Running doctor to verify..."
npm run j -- doctor

echo ""
echo "Jules-Ultra environment successfully initialized!"
echo "To get started, try:"
echo "  npm run j -- status"
echo "  npm run j -- list"
echo "  npm run j -- context engineer"
echo "======================================"
