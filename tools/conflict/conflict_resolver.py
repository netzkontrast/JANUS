#!/usr/bin/env python3
import sys
import os
import argparse
import datetime
import subprocess
import shutil
import json

def spawn_test_generator(hypothesis_file, output_test_file):
    """
    Spawns zeroclaw to generate a test script based on a hypothesis.
    Returns the process object.
    """
    with open(hypothesis_file, "r") as f:
        hypothesis_content = f.read()

    prompt = f"""
    You are writing a verification script for a Ground Truth Conflict Resolver.
    Read the following hypothesis:

    {hypothesis_content}

    Write a Python script that validates this hypothesis against the actual environment/codebase.
    The script should exit 0 if the hypothesis is true, and exit 1 if false.
    Output ONLY the python code. Do not wrap it in markdown. Do not provide explanations.
    """

    cmd = [
        "zeroclaw", "agent",
        "-m", prompt,
        "--memory-backend", "none",
        "--compact-context"
    ]

    print(f"Spawning generator for {hypothesis_file}...")

    # We do not use asyncio here for simplicity, we just run sequentially for now
    # (since the issue allows simpler sub-agent dispatching) or we can Popen and wait
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return proc

def main():
    parser = argparse.ArgumentParser(description="Ground Truth Conflict Resolver")
    parser.add_argument("--hypothesis-a", required=True, help="Path to Hypothesis A markdown file")
    parser.add_argument("--hypothesis-b", required=True, help="Path to Hypothesis B markdown file")
    parser.add_argument("--output-dir", default=".conflict", help="Directory to store conflict resolution runs")
    parser.add_argument("--dummy", action="store_true", help="Bypass zeroclaw generation for testing")

    args = parser.parse_args()

    if not os.path.exists(args.hypothesis_a):
        print(f"Error: Hypothesis A file '{args.hypothesis_a}' not found.", file=sys.stderr)
        sys.exit(1)

    if not os.path.exists(args.hypothesis_b):
        print(f"Error: Hypothesis B file '{args.hypothesis_b}' not found.", file=sys.stderr)
        sys.exit(1)

    run_id = datetime.datetime.now().strftime("%Y%m%d%H%M%S-conflict")
    run_dir = os.path.join(args.output_dir, "runs", run_id)

    print(f"=== Ground Truth Conflict Resolver ===")
    print(f"Run ID: {run_id}")
    print(f"Run Directory: {run_dir}")

    dir_a = os.path.join(run_dir, "hypothesis-a")
    dir_b = os.path.join(run_dir, "hypothesis-b")
    os.makedirs(dir_a, exist_ok=True)
    os.makedirs(dir_b, exist_ok=True)

    # Copy hypothesis files into run dir
    target_a = os.path.join(dir_a, "hypothesis.md")
    target_b = os.path.join(dir_b, "hypothesis.md")
    shutil.copyfile(args.hypothesis_a, target_a)
    shutil.copyfile(args.hypothesis_b, target_b)

    current_link = os.path.join(args.output_dir, "current")
    if os.path.exists(current_link) or os.path.islink(current_link):
        os.remove(current_link)
    os.symlink(os.path.relpath(run_dir, args.output_dir), current_link)

    print("\nPhase 1: Environment Initialized")

    test_file_a = os.path.join(dir_a, "test_suite.py")
    test_file_b = os.path.join(dir_b, "test_suite.py")

    if args.dummy:
        print("DUMMY MODE: writing mock passing and failing tests.")
        with open(test_file_a, "w") as f:
            f.write("import sys\nsys.exit(0)\n")
        with open(test_file_b, "w") as f:
            f.write("import sys\nsys.exit(1)\n")
    else:
        proc_a = spawn_test_generator(target_a, test_file_a)
        proc_b = spawn_test_generator(target_b, test_file_b)

        stdout_a, stderr_a = proc_a.communicate()
        stdout_b, stderr_b = proc_b.communicate()

        # Clean markdown wrappers if any
        code_a = stdout_a.replace("```python", "").replace("```", "").strip()
        code_b = stdout_b.replace("```python", "").replace("```", "").strip()

        with open(test_file_a, "w") as f:
            f.write(code_a)
        with open(test_file_b, "w") as f:
            f.write(code_b)

    print("\nPhase 2: Tests Generated")
    print(f"  - A: {test_file_a}")
    print(f"  - B: {test_file_b}")

    print("\nPhase 3: Test Execution")
    res_a = subprocess.run([sys.executable, test_file_a], capture_output=True, text=True)
    res_b = subprocess.run([sys.executable, test_file_b], capture_output=True, text=True)

    score_a = 1 if res_a.returncode == 0 else 0
    score_b = 1 if res_b.returncode == 0 else 0

    results = {
        "A": {"exit_code": res_a.returncode, "stdout": res_a.stdout, "stderr": res_a.stderr, "score": score_a},
        "B": {"exit_code": res_b.returncode, "stdout": res_b.stdout, "stderr": res_b.stderr, "score": score_b}
    }

    with open(os.path.join(run_dir, "results-a.json"), "w") as f:
        json.dump(results["A"], f, indent=2)
    with open(os.path.join(run_dir, "results-b.json"), "w") as f:
        json.dump(results["B"], f, indent=2)

    print(f"  - Hypothesis A exit code: {res_a.returncode}")
    print(f"  - Hypothesis B exit code: {res_b.returncode}")

    print("\nPhase 4: Verdict Evaluation")
    if score_a > score_b:
        winner = "A"
        reasoning = "Hypothesis A tests passed while B failed."
    elif score_b > score_a:
        winner = "B"
        reasoning = "Hypothesis B tests passed while A failed."
    else:
        winner = "Tie"
        if score_a == 1:
            reasoning = "Both tests passed. Tiebreak needed (e.g. fewer assumptions)."
        else:
            reasoning = "Both tests failed. The current code violates both hypotheses."

    verdict = {
        "winner": winner,
        "reasoning": reasoning,
        "scores": {"A": score_a, "B": score_b},
        "timestamp": datetime.datetime.now().isoformat() + "Z"
    }

    verdict_path = os.path.join(run_dir, "verdict.json")
    with open(verdict_path, "w") as f:
        json.dump(verdict, f, indent=2)

    print(f"  - Winner: {winner}")
    print(f"  - Reasoning: {reasoning}")
    print(f"  - Verdict saved to {verdict_path}")

    print("\nPhase 5: Update STATE.md and Source")
    state_file = "STATE.md"
    if not os.path.exists(state_file):
        with open(state_file, "w") as f:
            f.write("# Janus State\n\n")

    log_block = f"""
<!-- CONFLICT:{run_id} -->
**Resolved:** {verdict["timestamp"]}
**Winner:** Hypothesis {winner}
**Run dir:** `{run_dir}`

<details>
<summary>Verdict reasoning</summary>

{reasoning}

</details>
<!-- /CONFLICT:{run_id} -->
"""

    with open(state_file, "a") as f:
        f.write("\n" + log_block.strip() + "\n")
    print(f"Appended conflict resolution log block to {state_file}")

    # Update source document logic
    if winner in ["A", "B"]:
        winning_file = args.hypothesis_a if winner == "A" else args.hypothesis_b
        try:
            with open(winning_file, "r") as f:
                winning_content = f.read()

            # Write resolution header directly into the winning hypothesis file to mark it as source of truth
            header = f"> **GROUND TRUTH RESOLVED ({verdict['timestamp']})**\n> This hypothesis was verified via CodeAct against competing claims.\n> Run ID: {run_id}\n\n"

            with open(winning_file, "w") as f:
                f.write(header + winning_content)

            print(f"Updated source document {winning_file} to reflect Ground Truth status.")
        except Exception as e:
            print(f"Failed to update source document: {e}")

if __name__ == "__main__":
    main()
