import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Project } from '../../models/project.model';

const KEY = 'worklog-projects';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  constructor(private storage: StorageService) {}

  getAll(): Project[] {
    return this.storage.getItem<Project[]>(KEY) ?? [];
  }

  getById(id: string): Project | undefined {
    return this.getAll().find(p => p.id === id);
  }

  create(data: Omit<Project, 'id' | 'createdAt'>): Project {
    const project: Project = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString().slice(0, 10),
    };
    this.storage.setItem(KEY, [...this.getAll(), project]);
    return project;
  }
}
