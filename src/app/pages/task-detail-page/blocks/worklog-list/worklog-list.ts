import { Component, Input } from '@angular/core';
import { WorklogEntry } from '../../../../models/worklog-entry.model';
import { WorklogEntryComponent } from '../../modules/worklog-entry/worklog-entry';

@Component({
  selector: 'app-worklog-list',
  standalone: true,
  imports: [WorklogEntryComponent],
  templateUrl: './worklog-list.html',
})
export class WorklogListComponent {
  @Input({ required: true }) entries!: WorklogEntry[];

  get totalHours(): number {
    return this.entries.reduce((sum, e) => sum + e.durationHours, 0);
  }
}
