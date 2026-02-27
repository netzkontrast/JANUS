#!/usr/bin/env python3
import subprocess
import sys

def run_command(command):
    """Runs a shell command and returns the exit code."""
    try:
        result = subprocess.run(command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(f"✅ Command '{command}' passed.")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Command '{command}' failed.")
        print(e.stderr.decode())
        return False

def main():
    print("🔒 Enforcing Verification Loop...")

    # 1. Linting
    if not run_command("mise run lint"):
        sys.exit(1)

    # 2. Testing
    if not run_command("mise run test"):
        sys.exit(1)

    print("✅ All verifications passed.")
    sys.exit(0)

if __name__ == "__main__":
    main()
