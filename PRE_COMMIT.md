# Pre-Commit Checklist

**Instructions:**
Before submitting any changes (using the `submit` tool), you **MUST** verified that all items in this checklist are completed.

## 1. Project State & Documentation
- [ ] **Update STATE.md:** Ensure the "Status", "Current Task", "Latest Update", and "Completed Actions" accurately reflect the work done.
- [ ] **Session Logs:** Ensure `.sessions/<id>/Jules.md` and `.sessions/<id>/user.md` are up-to-date with the latest reasoning and interactions.
- [ ] **Session Report:** If the session is concluding, generate a `Session_Report.md` summarizing the achievements and next steps.

## 2. Code Quality & Testing
- [ ] **Verify Tests:** Run all relevant tests (e.g., `npm test`, `pytest`) and ensure they pass.
- [ ] **Linting:** Ensure code adheres to project standards.
- [ ] **Build Check:** If applicable, ensure the project builds without errors.

## 3. Self-Correction
- [ ] **Review AGENTS.md:** Did I follow all core directives?
- [ ] **Reflection:** Did I miss any implicit requirements? (Check `user.md` again).

**Command:**
Run this command to print the checklist before submitting:
`cat PRE_COMMIT.md`
