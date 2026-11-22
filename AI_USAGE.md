# AI Usage Disclosure

## Tools used

- OpenAI Codex (GPT-6) for implementation support, code review, and documentation.

## Representative prompts

1. “Analyze the assignment and reference material before implementation.”
2. “Build the responsive FocusBoard dashboard with task CRUD, search, filters, derived statistics, a three-slide carousel, and localStorage persistence.”
3. “Check the project against the assignment requirements and verify the build and interactions.”

## AI-assisted areas

- Project scaffolding and component structure.
- Dashboard styles and responsive behavior.
- Task state, form validation, derived statistics, filters, and carousel interactions.
- README and this disclosure.

## Suggestion reviewed

The reference guide suggests matching the supplied Figma frames as the visual source of truth. I checked the supplied files, but they did not include a shareable Figma URL or exported frames. The current styling is based on the assignment’s written frame descriptions; the exact visual match still needs review against the frames when available.

## Understanding and verification

The task collection is held in React state and synchronized to `localStorage`. Counts and filtered rows are derived from that collection, and task actions replace state immutably. Automated tests cover statistics, combined filters, search, ordering, and storage recovery/write behavior.
