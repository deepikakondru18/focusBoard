# AI Usage Disclosure

## Tool used

OpenAI Codex (GPT-6) supported implementation, code review, and documentation.

## Representative prompts

1. “Analyze the assignment and reference material before implementation.”
2. “Build the responsive FocusBoard dashboard with task CRUD, search, filters, derived statistics, a three-slide carousel, and localStorage persistence.”
3. “Check the project against the assignment requirements and verify the build and interactions.”

## AI-assisted areas

- Project scaffolding, component structure, and responsive dashboard styling.
- Task state, form validation, derived statistics, filters, carousel behavior, and local storage persistence.
- README and this disclosure.

## Design source

The assignment PDF embeds the Figma file and links for the desktop dashboard, mobile dashboard, task form, and carousel slides. The interface was updated against those frames. The written reference guide asks for a To do tab that the dashboard frame omits, so the implementation includes the tab to satisfy the written requirement.

## Understanding and verification

The task collection is held in React state and synchronized to `localStorage`. Counts and filtered rows are derived from that collection, and task actions update it immutably. Automated checks cover statistics, combined filters, search, ordering, and storage recovery/write behavior. The current project passes lint, production build, and all six automated checks.
