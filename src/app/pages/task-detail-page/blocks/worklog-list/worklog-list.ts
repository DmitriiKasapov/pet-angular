import { Component, Input } from '@angular/core';
import { WorklogEntry } from '../../../../models/worklog-entry.model';

@Component({
  selector: 'app-worklog-list',
  standalone: true,
  templateUrl: './worklog-list.html',
})
export class WorklogListComponent {
  @Input({ required: true }) entries!: WorklogEntry[];

  get totalHours(): number {
    return this.entries.reduce((sum, e) => sum + e.durationHours, 0);
  }

  formatTime(startHour: number): string {
    const h = Math.floor(startHour);
    const m = Math.round((startHour - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }
}
