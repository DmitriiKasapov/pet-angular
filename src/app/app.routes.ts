import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
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
];
