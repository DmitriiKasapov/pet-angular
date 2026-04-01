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

  /** Returns entries whose date falls within [weekStartDate, weekStartDate + 7 days) */
  getByWeek(weekStartDate: string): WorklogEntry[] {
    const start = new Date(weekStartDate);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    const endStr = end.toISOString().slice(0, 10);
    return this.getAll().filter(e => e.date >= weekStartDate && e.date < endStr);
  }

  create(data: Omit<WorklogEntry, 'id'>): WorklogEntry {
    const entry: WorklogEntry = { ...data, id: crypto.randomUUID() };
    this.storage.setItem(KEY, [...this.getAll(), entry]);
    return entry;
  }

  update(id: string, changes: Partial<Omit<WorklogEntry, 'id'>>): void {
    const entries = this.getAll().map(e => e.id === id ? { ...e, ...changes } : e);
    this.storage.setItem(KEY, entries);
  }

  delete(id: string): void {
    const entries = this.getAll().filter(e => e.id !== id);
    this.storage.setItem(KEY, entries);
  }
}
