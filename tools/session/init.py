#!/usr/bin/env python3
import sys
import os
import argparse
from logger import log_event

def get_next_session_id():
    """Finds the highest session id in .sessions and returns +1"""
    if not os.path.exists(".sessions"):
        return 1

    highest = 0
    for dirname in os.listdir(".sessions"):
        if dirname.isdigit():
            highest = max(highest, int(dirname))

    return highest + 1

def main():
    parser = argparse.ArgumentParser(description="Session Initializer")
    parser.add_argument("--id", type=int, default=None, help="Force a specific session ID")
    parser.add_argument("--goal", required=True, help="High level goal for this session")

    args = parser.parse_args()

    session_id = args.id if args.id is not None else get_next_session_id()
    # Resolve relative to repo root
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    sessions_root = os.path.join(repo_root, ".sessions")

    session_dir = os.path.join(sessions_root, str(session_id))

    print(f"Initializing Session {session_id}...")

    os.makedirs(session_dir, exist_ok=True)
    os.makedirs(os.path.join(session_dir, "sources"), exist_ok=True)

    readme_path = os.path.join(session_dir, "README.md")
    with open(readme_path, "w") as f:
        f.write(f"# Session {session_id}\n\n**Goal:** {args.goal}\n")

    jules_path = os.path.join(session_dir, "Jules.md")
    with open(jules_path, "w") as f:
        f.write("# Jules Orchestration Notes\n\n")

    user_path = os.path.join(session_dir, "user.md")
    with open(user_path, "w") as f:
        f.write("# User Context\n\n")

    log_event(session_id, "session_init", "jules", {"goal": args.goal})

    print(f"Session {session_id} initialized at {session_dir}/")
    print(f"Goal: {args.goal}")

if __name__ == "__main__":
    main()
