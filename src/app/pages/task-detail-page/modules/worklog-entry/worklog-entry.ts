import { Component, Input } from '@angular/core';
import { WorklogEntry } from '../../../../models/worklog-entry.model';

@Component({
  selector: 'app-worklog-entry',
  standalone: true,
  templateUrl: './worklog-entry.html',
})
export class WorklogEntryComponent {
  @Input({ required: true }) entry!: WorklogEntry;

  formatTime(startHour: number): string {
    const h = Math.floor(startHour);
    const m = Math.round((startHour - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }
}
