import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  getItem<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  /** Dev utility — clears all app-owned keys */
  clearAllAppData(): void {
    const APP_KEYS = [
      'worklog-projects',
      'worklog-tasks',
      'worklog-entries',
      'worklog-comments',
      'worklog-seeded',
    ];
    APP_KEYS.forEach(k => localStorage.removeItem(k));
  }
}
