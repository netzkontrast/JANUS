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

*   **Session Folders:** Must be strictly named `session_<N>`, where `<N>` is the sequential number (e.g., `session_1`, `session_2`, `session_3`).
*   **Prompt File:** Always named `user.md` inside the `sources/` subdirectory of the session.
*   **Audit Trail:** Always named `Jules.md` (or the respective agent's name) directly within the session folder.

## 3. Workflow for New Sessions

1.  **Identify Sequence:** Determine the next available session number by inspecting `.sessions/`.
2.  **Create Skeleton:** Create `.sessions/session_<N>/sources/`.
3.  **Capture Prompt:** Write the user's initial prompt into `.sessions/session_<N>/sources/user.md`.
4.  **Execute Task:** Perform the requested work.
5.  **Audit Logging:** Write a chronological summary of actions taken into `.sessions/session_<N>/Jules.md`.
6.  **Global Log Update:** Append a single JSON object to `.sessions/session_log.jsonl` summarizing the session outcome:
    `{"session_id": "session_<N>", "action": "Brief summary", "status": "completed"}`

These instructions are mandatory and must be executed as part of the initial planning phase for every new task.