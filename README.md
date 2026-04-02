# DevLog — Time Tracking App

A single-page application for tracking work time and managing tasks across projects.  
Built with Angular 19 as a portfolio project — no backend, no database, runs entirely in the browser.

---

## Quick Start

**Requirements:** Node.js 18+, npm

```bash
# Clone the repository
git clone https://github.com/DmitriiKasapov/pet-angular.git
cd pet-angular

# Install dependencies
npm install

# Start the development server
npm start
```

Open the URL shown in the terminal in your browser.

> On first launch the app automatically loads demo data: 3 projects, 11 tasks, 15 worklog entries and 5 comments — so you can explore all features right away.

---

## Data Storage

All data is stored in **localStorage** — nothing is sent to any server.  
To reset to the original demo data, open DevTools → Application → Local Storage → clear all keys starting with `worklog-`.

---

## Tech Stack

- **Angular 19** — standalone components, signals, lazy-loaded routes
- **TypeScript** — strict typing throughout
- **Tailwind CSS v4** — utility-first styling with design tokens
- **Reactive Forms** — form validation and control
- **No external UI libraries** — all components are handcrafted

---

## Features

### Week Board `/board` ← default page
- Visual time grid for the current week (Mon–Sun)
- All logged work entries displayed as blocks on the grid
- **Click any column** to log a new work entry for that day
- **Drag blocks** between days to move an entry
- **Resize blocks** by dragging the bottom edge to adjust duration
- **Edit or delete** any entry via hover controls
- Navigate between weeks with Prev / Next; jump back with Today

### Projects `/projects`
- View all projects as a list with name, code and description
- **Create a project** — name, short code (e.g. `INT`), description, color
- **Search** projects by name, code, or task name
- Click a project to open its detail page

### Project detail `/projects/:id`
- **Tasks tab** — list of all tasks with status badges and logged hours
  - Search tasks by code or title
  - **Create a task** — title, description, status, estimated hours
  - Click a task to open its detail page
- **Analytics tab** — hours logged per task with progress bars, sorted by most time spent

### Task detail `/tasks/:id`
- Full task info: code, title, description, status, estimate
- **Change status** — Planning → In Progress → Done
- **Log work** — date, start time, duration, optional comment
- Work log list with total hours
- **Comments** — add, edit, delete comments on the task

### Analytics `/analytics`
- Weekly summary: total hours and entry count
- **Hours by day** — bar chart for each day of the week
- **Hours by project** — colored bars per project, sorted by most time
- **Hours by task** — table with task code, title, project, status and hours
- Navigate between weeks; resets to current week with Today
