import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Task, TaskStatus } from '../../models/task.model';

const KEY = 'worklog-tasks';

@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor(private storage: StorageService) {}

  getAll(): Task[] {
    return this.storage.getItem<Task[]>(KEY) ?? [];
  }

  getByProject(projectId: string): Task[] {
    return this.getAll().filter(t => t.projectId === projectId);
  }

  getById(id: string): Task | undefined {
    return this.getAll().find(t => t.id === id);
  }

  create(data: Omit<Task, 'id' | 'code' | 'createdAt'>, projectCode: string): Task {
    const projectTasks = this.getByProject(data.projectId);
    const nextNum = projectTasks.length + 1;
    const code = `${projectCode}-${String(nextNum).padStart(3, '0')}`;
    const task: Task = {
      ...data,
      id: crypto.randomUUID(),
      code,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    this.storage.setItem(KEY, [...this.getAll(), task]);
    return task;
  }

  updateStatus(id: string, status: TaskStatus): void {
    const tasks = this.getAll().map(t => t.id === id ? { ...t, status } : t);
    this.storage.setItem(KEY, tasks);
  }
}
