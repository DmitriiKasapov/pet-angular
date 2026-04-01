import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { TaskComment } from '../../models/task-comment.model';

const KEY = 'worklog-comments';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  constructor(private storage: StorageService) {}

  getByTask(taskId: string): TaskComment[] {
    return (this.storage.getItem<TaskComment[]>(KEY) ?? [])
      .filter(c => c.taskId === taskId)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  update(id: string, text: string): void {
    const all = this.storage.getItem<TaskComment[]>(KEY) ?? [];
    this.storage.setItem(KEY, all.map(c => c.id === id ? { ...c, text } : c));
  }

  delete(id: string): void {
    const all = this.storage.getItem<TaskComment[]>(KEY) ?? [];
    this.storage.setItem(KEY, all.filter(c => c.id !== id));
  }

  create(taskId: string, text: string): TaskComment {
    const all = this.storage.getItem<TaskComment[]>(KEY) ?? [];
    const comment: TaskComment = {
      id: crypto.randomUUID(),
      taskId,
      text,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    this.storage.setItem(KEY, [...all, comment]);
    return comment;
  }
}
