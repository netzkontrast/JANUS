# Session Management Guidelines

## 1. Directory Structure

All executed tasks and interactive prompts must be tracked immutably within the `.sessions/` directory. Each discrete interaction with an agent is considered a "Session".

The structure **must** follow this exact format:

```
.sessions/
├── session_1/
│   ├── sources/
│   │   └── user.md      # The raw, exact prompt provided by the user
│   └── Jules.md         # The system audit trail documenting actions and decisions
├── session_2/
├── ...
└── session_log.jsonl    # A global, append-only JSONL log of all session states
```

## 2. Naming Conventions
- Always prefix directories correctly.
- Ensure the state file and logs are continually updated to prevent Context Rot.

## 3. Storage Rules
- External context, logs, and interaction trails should not pollute the main repository. Use `.sessions/` effectively to structure all planning and execution details.
