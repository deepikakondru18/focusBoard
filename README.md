# FocusBoard

A mobile-first, single-user task dashboard built for the Mobile First Applications frontend assessment. It follows the desktop, mobile, and task-form frames linked from the assignment PDF and keeps task planning, status, and progress in one place.

## Features

- Twelve first-run sample tasks across To do, In progress, and Completed, with varied priorities and categories.
- Create and edit tasks with title, description, status, priority, and optional due date.
- Mark a task complete from its check control; change other statuses, edit, or delete from its actions menu. Deletion asks for confirmation.
- Search titles and combine status and priority filters.
- Derive totals, in-progress count, completed count, and completion percentage from the current task list.
- Three manually navigable Focus Notes slides, including previous/next controls and direct slide indicators.
- Save tasks in browser `localStorage` and recover safely when saved data is missing or invalid.
- Responsive desktop, tablet, and mobile layouts; keyboard focus styling and labeled controls.

## Technology

React 19, Vite 8, JavaScript, CSS, Lucide React, and browser `localStorage`. This is a frontend-only assessment project; it has no backend, account system, or third-party task API.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, preview it with `npm run preview`, run the automated checks with `npm test`, and run static checks with `npm run lint`.

## Project structure

```text
src/
  components/
    FilterTabs.jsx            Status filter tabs
    FocusNotes.jsx            Three-slide Focus Notes carousel
    CalendarView.jsx          Due-date calendar with month navigation
    Header.jsx                Responsive brand and dashboard header
    MobileNav.jsx             Mobile navigation
    SearchBar.jsx             Task title search
    SettingsView.jsx          Saved calendar preferences
    Sidebar.jsx               Desktop workspace navigation
    StatCard.jsx              Reusable overview statistic
    TaskCard.jsx              Task row and accessible actions menu
    TaskForm.jsx              Shared create/edit form
    TaskList.jsx              Filtered list and empty state
  data/
    sampleTasks.js            First-run task dataset
    taskUtils.js              Statistics, filtering, and ordering
  hooks/
    useLocalStorage.js        Safe browser persistence hook
  App.jsx                     Dashboard state and task interactions
  App.css                     Components and responsive layouts
  index.css                   Global styles and design tokens
tests/
  taskUtils.test.js           Data and persistence unit checks
screenshots/
  dashboard-desktop.png       User-provided earlier desktop capture
  dashboard-mobile.png        User-provided mobile reference capture
  create-task-form.png        User-provided earlier task-form capture
```

## Data and interactions

`useLocalStorage` restores the task array from `focusboard_tasks`, falling back to the twelve sample tasks when storage is missing or invalid. Create, edit, delete, and status changes update the task array immutably and save it to local storage. Statistics and task filters are derived from that same collection. The carousel holds its current slide in component state.

Calendar and Settings are functional workspace pages. Calendar shows dated tasks by month, supports month navigation, and opens a task for editing. Settings lets the user choose the week start and whether completed tasks appear on the calendar; preferences persist in local storage. The written reference guide requests four task tabs (All, To do, In progress, Completed); the Figma dashboard frame shows All, In progress, and Completed. This implementation follows the guide and keeps all four tabs.

## Design reference

The assignment PDF includes a Figma design file. The links are embedded in that PDF rather than given as a separate message:

- [FocusBoard dashboard reference file](https://www.figma.com/design/09TveHXjOvI73KDNndCFM4/FocusBoard-%E2%80%94-Dashboard-References)
- Desktop dashboard: node `1-2`
- Mobile dashboard: node `1-167`
- Create-task form: node `1-279`
- Focus Notes slides: nodes `15-58`, `15-30`, and `15-2`

## Verification

- `npm run lint` — passed.
- `npm run build` — passed.
- `npm test` — 6 checks passed.

The automated checks cover derived statistics, empty collections, case-insensitive partial title search, combined status and priority filtering, non-mutating order, and storage recovery/writes. The existing desktop, mobile, and form images are earlier captures; capture fresh desktop and mobile screenshots from the current build before using them as final submission evidence.

## Submission checklist

- [x] Frontend app and required task interactions
- [x] Responsive design and local persistence
- [x] README and AI usage disclosure
- [x] Build, lint, and automated checks
- [ ] Replace older desktop/mobile/form screenshots with captures of the current app; include one desktop and one mobile screenshot
- [ ] Push to a public GitHub repository and add its URL
- [ ] Deploy to a public HTTPS URL and add it here

## Interview explanation

FocusBoard uses one task array as its source of truth. A reusable local storage hook restores and persists it. The app derives statistics and filtered rows from that array, while shared form and menu components manage create, edit, status changes, and confirmed deletion. The carousel maintains its own slide state. Vite, React, plain CSS, and Lucide keep the frontend lightweight without a backend the assessment does not require.

## Submission links

- Hosted application: add the public HTTPS deployment URL after deployment.
- Public GitHub repository: add the public repository URL after pushing.
