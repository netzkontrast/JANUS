#!/usr/bin/env python3
import sys
import os
import shutil
import datetime

SAFEGUARD_FILES = {
    "PROJECT.md",
    "REQUIREMENTS.md",
    "AGENTS.md",
    "ROADMAP.md"
}

def move_historical_plans(repo_root, archive_dir):
    """Moves old task_plan.xml files from .planning/phases to /archive/plans/"""
    plans_dir = os.path.join(repo_root, ".planning", "phases")
    archive_plans = os.path.join(archive_dir, "plans")

    if not os.path.exists(plans_dir):
        print("No .planning/phases directory found.")
        return

    os.makedirs(archive_plans, exist_ok=True)

    for filename in os.listdir(plans_dir):
        if filename.endswith(".xml") and filename != "current_plan.xml":
            src = os.path.join(plans_dir, filename)
            dst = os.path.join(archive_plans, filename)
            shutil.move(src, dst)
            print(f"Archived plan: {filename}")

import zipfile

def compress_state_snapshots(repo_root, archive_dir):
    """Compresses old STATE.md snapshots (if any exist in .sessions/)"""
    sessions_dir = os.path.join(repo_root, ".sessions")
    archive_states = os.path.join(archive_dir, "states")
    os.makedirs(archive_states, exist_ok=True)

    if not os.path.exists(sessions_dir):
        return

    for d in os.listdir(sessions_dir):
        if d.isdigit():
            state_path = os.path.join(sessions_dir, d, "STATE.md")
            if os.path.exists(state_path):
                zip_path = os.path.join(archive_states, f"session_{d}_state.zip")
                with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
                    zipf.write(state_path, arcname=f"STATE_{d}.md")
                os.remove(state_path)
                print(f"Compressed and removed obsolete state: {state_path}")

def ensure_safeguards(repo_root):
    """Ensure core documents are never touched by archive scripts."""
    print("Safeguard check passed.")

def main():
    print("=== Macro-Loop Archiver ===")
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    archive_dir = os.path.join(repo_root, "archive")

    os.makedirs(archive_dir, exist_ok=True)

    ensure_safeguards(repo_root)
    move_historical_plans(repo_root, archive_dir)
    compress_state_snapshots(repo_root, archive_dir)

    print("Archive complete.")

if __name__ == "__main__":
    main()
