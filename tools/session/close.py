#!/usr/bin/env python3
import sys
import os
import argparse
import datetime
from logger import log_event

def main():
    parser = argparse.ArgumentParser(description="Session Closer")
    parser.add_argument("--id", type=int, required=True, help="Session ID to close")
    parser.add_argument("--status", required=True, choices=['success', 'failure', 'partial'], help="Session outcome status")

    args = parser.parse_args()

    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    sessions_root = os.path.join(repo_root, ".sessions")
    session_dir = os.path.join(sessions_root, str(args.id))

    if not os.path.exists(session_dir):
        print(f"Error: Session {args.id} directory not found at {session_dir}", file=sys.stderr)
        sys.exit(1)

    print(f"Closing Session {args.id}...")
    log_event(args.id, "session_close", "jules", {"status": args.status})

    # Generate Session_Report.md stub
    report_path = os.path.join(repo_root, "Session_Report.md")
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    report_content = f"""# Session {args.id} Report
**Date:** {timestamp}
**Status:** {args.status.upper()}

## 1. Goal
(Auto-generated stub. Refer to `.sessions/{args.id}/README.md` for initial goal.)

## 2. Actions Taken
- Tools created/modified:
- Bugs fixed:

## 3. Findings / Blockers
- (Add any architectural decisions or errors encountered here)

## 4. Next Steps
-
"""
    with open(report_path, "w") as f:
        f.write(report_content)

    print(f"Generated Session_Report.md stub at {report_path}")

    # Update STATE.md
    state_path = os.path.join(repo_root, "STATE.md")
    if os.path.exists(state_path):
        with open(state_path, "a") as f:
            f.write(f"\n<!-- SESSION:{args.id} -->\n")
            f.write(f"**Session {args.id} Closed** ({timestamp})\n")
            f.write(f"- Status: {args.status}\n")
            f.write(f"- Details: See Session_Report.md or `.sessions/{args.id}/`\n")
            f.write(f"<!-- /SESSION:{args.id} -->\n")
        print(f"Appended session close block to STATE.md")
    else:
        print(f"Warning: STATE.md not found at {state_path}")

if __name__ == "__main__":
    main()
