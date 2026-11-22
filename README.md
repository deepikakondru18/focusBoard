# FocusBoard

A responsive, single-user task dashboard built for the Mobile First Applications frontend assessment. FocusBoard keeps task planning, progress, and a few gentle focus reminders in one place.

## Features

- Six starter tasks with status, priority, category, description, and due date.
- Create and edit tasks in a shared validated form; delete with confirmation.
- Change task status directly from the list.
- Search task titles and combine status and priority filters.
- Derived task totals, completion counts, and completion percentage.
- Three manually navigable Focus Notes slides.
- Task persistence in browser `localStorage`.
- Responsive layouts for desktop, tablet, and mobile, plus keyboard-visible focus styling.

## Technology

React 19, Vite 8, JavaScript, CSS, Lucide React, and browser `localStorage`. No backend, account, or third-party task API is used.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, and preview it with `npm run preview`.
Run the automated data and persistence checks with `npm test`, and run static checks with `npm run lint`.

## Project structure

```text
src/
  components/
    FilterTabs.jsx            Status filter tabs
    FocusNotes.jsx            Focus Notes carousel
    Header.jsx                Dashboard header
    SearchBar.jsx             Task title search
    Sidebar.jsx               Workspace navigation and progress
    StatCard.jsx              Reusable overview statistic
    TaskCard.jsx              Task row and task actions
    TaskForm.jsx              Shared create/edit form
    TaskList.jsx              Visible task list and empty state
  data/sampleTasks.js         First-run task dataset
  data/taskUtils.js           Derived statistics, filters, ordering
  hooks/useLocalStorage.js    Safe browser persistence hook
  App.jsx                     Dashboard, task state, filters, derived totals
  App.css                     Component and responsive styles
  index.css                   Global styles and design tokens
tests/
  taskUtils.test.js           Data and persistence unit checks
screenshots/                  Desktop, mobile, and create-task captures
```

## State and persistence

The dashboard uses React state through the `useLocalStorage` hook; no external state library is needed for this single-user app. The hook safely restores the task array from `focusboard_tasks`, falling back to the six starter tasks when storage is missing or invalid. Create, edit, delete, and status changes update the task array immutably, after which the hook saves the full array back to localStorage.

Counts and completion percentage are derived from the current task array. Search, status, and priority filters are applied to the same collection, and ordering returns a copy so the source state is not mutated. The Focus Notes carousel keeps its current slide in component state.

## Requirements audit

| Requirement | Implementation | Verification | Status |
| --- | --- | --- | --- |
| At least six sample tasks across statuses and priorities | `src/data/sampleTasks.js` | Confirmed six initial tasks in the browser | Complete |
| Create and edit tasks with form validation | `src/components/TaskForm.jsx`, `src/App.jsx` | Browser create/edit flows and required-title validation | Complete |
| Delete tasks with confirmation | `src/App.jsx` | Browser confirmed cancel retains task and confirm removes it | Complete |
| Update task status | `src/App.jsx` | Browser status update and recalculated totals | Complete |
| Case-insensitive partial title search and empty state | `src/components/SearchBar.jsx`, `src/components/TaskList.jsx` | Browser search, no-results state, and clear filters | Complete |
| Status and priority filters work together | `src/data/taskUtils.js` | Unit test and browser combined-filter check | Complete |
| Dynamic totals and completion percentage | `src/data/taskUtils.js` | Unit tests cover populated and empty collections | Complete |
| Three-slide Focus Notes carousel | `src/components/FocusNotes.jsx` | Browser previous/next and indicator navigation | Complete |
| Persist task data across refresh; handle invalid storage | `src/hooks/useLocalStorage.js` | Unit tests and browser refresh persistence check | Complete |
| Responsive at 390px, 768px, and 1440px | `src/App.css`, `src/index.css` | Browser viewport checks; no horizontal overflow observed | Complete |
| Accessible labels, keyboard focus, and delete confirmation | Form and dashboard components | Static code review and browser interaction checks | Implemented; assistive-technology audit not performed |
| README and AI usage disclosure | `README.md`, `AI_USAGE.md` | Files checked against the reference guide | Complete |
| Screenshots included in repository | `screenshots/` | Desktop dashboard, mobile dashboard, and create-task form captures are present; tablet capture remains | Partial |
| Public GitHub repository and public HTTPS deployment | Submission links below | Not created; user plans to push the local project | Pending |
| Compare against the supplied Figma frames | No frames/link were provided | Cannot compare against unavailable design source | Pending input |

## Interview explanation

FocusBoard is a React task dashboard with a single source of truth for tasks. A reusable localStorage hook restores and saves the complete task collection, while statistics and filtered rows are derived from that state. Task forms are shared for create and edit; status changes and confirmed deletion update the same collection. The carousel keeps its own slide state. The project uses Vite, plain CSS, and Lucide icons, with no backend because the assessment does not require one.

## Submission links

- Hosted application: pending public deployment.
- Public GitHub repository: pending push to a public repository.
- Screenshots: desktop (`screenshots/dashboard-desktop.png`), mobile (`screenshots/dashboard-mobile.png`), and create-task form (`screenshots/create-task-form.png`) captures are included. Add a tablet (768px) capture before submission.

The supplied assignment PDF references current Figma frames, but no shareable Figma link or exported frame images were available in the provided materials. The visual implementation follows the written frame descriptions and reference guide; exact Figma fidelity remains to be compared when those frames are available.

## Limitations

- Task data is stored per browser and is not synchronized between devices.
- Deployment, a public repository, and a tablet screenshot are still required to complete the submission package.
- Visual matching against the live Figma file has not been possible without access to its frames.
