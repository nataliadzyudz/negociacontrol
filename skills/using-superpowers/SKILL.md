# Skill: Superpowers (Agentic Framework)

This skill implements the "Superpowers" methodology for high-reliability agentic development.

## Core Methodology: Spec -> Plan -> Execute -> Verify

### 1. Spec (The "What")
- **Brainstorming:** Always start by refining the user's request. Ask clarifying questions if the goal is ambiguous.
- **Specification:** Output a clear document of *what* will be built before deciding *how*.

### 2. Plan (The "How")
- **Write Plans:** Create a detailed implementation plan.
- **Bite-Sized Tasks:** Break the work into small, atomic units.
- **Independence:** Each task should be clear enough for a fresh agent to execute.

### 3. Execute (The "Action")
- **TDD (Test-Driven Development):** Write a test first, verify it fails, then write the code.
- **Minimalism:** Write the simplest code that passes the test.
- **Subagents:** Use specialized subagents for research or complex isolated tasks.

### 4. Verify (The "Success")
- **Systematic Verification:** Always run tests or perform manual checks (browser, console) after execution.
- **Bug Reproducibility:** Before fixing a bug, create a reproduction case.

## System Commands & Subagents
- Use `browser_subagent` for UI/Web research.
- Use `run_command` for environment checks and testing.

## Ethical & Quality Guardrails
- **No Placeholders:** Always provide working, high-fidelity code.
- **Premium Aesthetics:** Every UI change must feel premium (texture, depth, typography).
- **Data Privacy:** Adhere strictly to consent and RGPD logic.
