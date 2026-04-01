import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { SEED_PROJECTS } from '../../data/seed/seed-projects';
import { SEED_TASKS } from '../../data/seed/seed-tasks';
import { SEED_WORKLOG } from '../../data/seed/seed-worklog';
import { SEED_COMMENTS } from '../../data/seed/seed-comments';

const SEEDED_KEY = 'worklog-seeded';

@Injectable({ providedIn: 'root' })
export class SeedService {
  constructor(private storage: StorageService) {}

  initialize(): void {
    if (this.storage.hasItem(SEEDED_KEY)) return;

    this.storage.setItem('worklog-projects', SEED_PROJECTS);
    this.storage.setItem('worklog-tasks', SEED_TASKS);
    this.storage.setItem('worklog-entries', SEED_WORKLOG);
    this.storage.setItem('worklog-comments', SEED_COMMENTS);
    this.storage.setItem(SEEDED_KEY, true);
  }
}
