#!/usr/bin/env python3
import sys
import os
import argparse
import json
from google import genai

SYSTEM_PROMPT = """
You are a machine learning analysis agent running in the "Meso-Loop" of the Janus framework.
Your job is to read raw session JSONL log events from the last 5 execution sessions and output an actionable markdown report identifying:
1. Recurring Error Patterns (e.g. repeated Python module missing errors, build failures).
2. Recurring Hallucination Signatures (e.g. the sub-agent generating invalid code or using bad logic).
3. Suggested updates to SKILL.md documents to fix these behaviors.
Output your findings in a strict markdown format to be stored directly in LEARNINGS.md.
"""

def gather_recent_logs(sessions_dir, count=5):
    """Finds the most recent N sessions and extracts their JSONL logs."""
    if not os.path.exists(sessions_dir):
        return ""

    session_dirs = []
    for d in os.listdir(sessions_dir):
        if d.isdigit():
            session_dirs.append(int(d))

    session_dirs.sort(reverse=True)
    target_dirs = session_dirs[:count]

    logs_content = ""
    for d in target_dirs:
        log_path = os.path.join(sessions_dir, str(d), "session_log.jsonl")
        if os.path.exists(log_path):
            logs_content += f"\n--- Session {d} Logs ---\n"
            try:
                with open(log_path, 'r', encoding='utf-8', errors='ignore') as f:
                    # Just grab raw lines, truncating giant stdout blobs if necessary
                    for line in f:
                        if len(line) > 1000:
                            logs_content += line[:1000] + "... [TRUNCATED]\n"
                        else:
                            logs_content += line
            except Exception:
                pass

    return logs_content

def extract_patterns(client, logs, dummy=False):
    if dummy:
        return """## Meso-Loop Analysis
### Recurring Error Patterns
- Sub-agents repeatedly fail to find the `google` module.
### Suggested Skill Updates
- Update setup scripts to enforce `google-genai` pip install before execution.
"""
    if not logs.strip():
        return "No session logs found for analysis."

    prompt = f"Analyze the following recent session logs:\n\n{logs}"

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
            ),
        )
        return response.text.strip()
    except Exception as e:
        return f"Error analyzing patterns via API: {e}"

def main():
    parser = argparse.ArgumentParser(description="Meso-Loop Compactor")
    parser.add_argument("--dummy", action="store_true", help="Bypass API calls for testing")
    args = parser.parse_args()

    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    sessions_dir = os.path.join(repo_root, ".sessions")

    api_key = os.environ.get("GEMINI_API_KEY")
    client = None
    if not args.dummy:
        if not api_key:
            print("Warning: GEMINI_API_KEY environment variable not set.", file=sys.stderr)
        try:
            client = genai.Client()
        except Exception as e:
            print(f"Failed to initialize GenAI client: {e}", file=sys.stderr)
            sys.exit(1)

    print("Gathering logs from last 5 sessions...")
    logs = gather_recent_logs(sessions_dir, count=5)

    print("Extracting pattern analysis...")
    analysis = extract_patterns(client, logs, args.dummy)

    learnings_path = os.path.join(repo_root, "LEARNINGS.md")

    print(f"Writing analysis to {learnings_path}...")
    with open(learnings_path, "a") as f:
        f.write("\n\n" + analysis + "\n")

    print("Meso-Loop complete.")

if __name__ == "__main__":
    main()
