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

## Structure

```text
src/
  components/FocusNotes.jsx   Focus Notes carousel
  components/TaskForm.jsx     Shared create/edit form
  data/sampleTasks.js         First-run task dataset
  hooks/useLocalStorage.js    Safe browser persistence hook
  App.jsx                     Dashboard, task state, filters, derived totals
  App.css                     Component and responsive styles
  index.css                   Global styles and design tokens
```

## State and persistence

The dashboard owns the task collection in React state through `useLocalStorage`. Create, edit, delete, and status changes replace task records immutably. Statistics and visible tasks are derived from the current collection, query, status tab, and priority selection. The full task collection is saved under `focusboard_tasks`; saved data takes precedence over starter tasks after reload. Carousel selection is local to the Focus Notes component.

## Submission links

- Hosted application: pending deployment.
- Public GitHub repository: pending repository creation.

The supplied assignment PDF references current Figma frames, but no shareable Figma link or exported frame images were available in the provided materials. The visual implementation follows the written frame descriptions and reference guide; exact Figma fidelity remains to be compared when those frames are available.

## Limitations

- Task data is stored per browser and is not synchronized between devices.
- Deployment and a public repository still require a hosting destination and repository URL.
- Visual matching against the live Figma file has not been possible without access to its frames.
