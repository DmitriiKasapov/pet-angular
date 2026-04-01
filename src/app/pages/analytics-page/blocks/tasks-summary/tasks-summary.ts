import { Component, Input } from '@angular/core';
import { TaskSummary } from '../../../../core/services/analytics.service';

@Component({
  selector: 'app-tasks-summary',
  standalone: true,
  templateUrl: './tasks-summary.html',
})
export class TasksSummaryComponent {
  @Input({ required: true }) tasks!: TaskSummary[];
}
