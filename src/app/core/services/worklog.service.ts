import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { WorklogEntry } from '../../models/worklog-entry.model';

const KEY = 'worklog-entries';

@Injectable({ providedIn: 'root' })
export class WorklogService {
  constructor(private storage: StorageService) {}

  getAll(): WorklogEntry[] {
    return this.storage.getItem<WorklogEntry[]>(KEY) ?? [];
  }

  getByTask(taskId: string): WorklogEntry[] {
    return this.getAll().filter(e => e.taskId === taskId);
  }

  create(data: Omit<WorklogEntry, 'id'>): WorklogEntry {
    const entry: WorklogEntry = { ...data, id: crypto.randomUUID() };
    this.storage.setItem(KEY, [...this.getAll(), entry]);
    return entry;
  }
}
