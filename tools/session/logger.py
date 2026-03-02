#!/usr/bin/env python3
import argparse
import os
import json
import time

def log_event(session_id, action, actor, payload, exit_code=None):
    """
    Writes an immutable JSONL event to the current session log.
    Can be used as a module or a CLI tool.
    """
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    sessions_root = os.path.join(repo_root, ".sessions")

    session_dir = os.path.join(sessions_root, str(session_id))
    os.makedirs(session_dir, exist_ok=True)
    log_file = os.path.join(session_dir, "session_log.jsonl")

    event = {
        "timestamp": time.time(),
        "session_id": str(session_id),
        "action": action,
        "actor": actor,
        "payload": payload,
        "exit_code": exit_code
    }

    with open(log_file, "a") as f:
        f.write(json.dumps(event) + "\n")

    return log_file

def main():
    parser = argparse.ArgumentParser(description="Session Event Logger")
    parser.add_argument("--session-id", required=True, help="Current Session ID")
    parser.add_argument("--action", required=True, help="Action name (e.g. user_prompt, task_plan, run_tests)")
    parser.add_argument("--actor", default="jules", help="Entity performing action")
    parser.add_argument("--payload", required=True, help="JSON string or text payload")
    parser.add_argument("--exit-code", type=int, default=None, help="Optional exit code to record")

    args = parser.parse_args()

    try:
        # Try to parse payload as JSON, otherwise treat as string
        payload = json.loads(args.payload)
    except Exception:
        payload = args.payload

    log_file = log_event(args.session_id, args.action, args.actor, payload, args.exit_code)
    print(f"Logged event to {log_file}")

if __name__ == "__main__":
    main()
