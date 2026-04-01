import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'board', pathMatch: 'full' },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects-page/projects-page').then(m => m.ProjectsPageComponent),
  },
  {
    path: 'projects/:id',
    loadComponent: () =>
      import('./pages/project-detail-page/project-detail-page').then(m => m.ProjectDetailPageComponent),
  },
  {
    path: 'board',
    loadComponent: () =>
      import('./pages/weekly-board-page/weekly-board-page').then(m => m.WeeklyBoardPageComponent),
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./pages/analytics-page/analytics-page').then(m => m.AnalyticsPageComponent),
  },
  {
    path: 'tasks/:id',
    loadComponent: () =>
      import('./pages/task-detail-page/task-detail-page').then(m => m.TaskDetailPageComponent),
  },
];
