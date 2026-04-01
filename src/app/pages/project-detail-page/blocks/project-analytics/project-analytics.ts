import { Component, Input, computed, input } from '@angular/core';
import { TaskSummary } from '../../project-detail-page.types';

const STATUS_LABELS: Record<string, string> = {
  planning: 'Planning',
  progress: 'In Progress',
  done: 'Done',
};

@Component({
  selector: 'app-project-analytics',
  standalone: true,
  templateUrl: './project-analytics.html',
})
export class ProjectAnalyticsComponent {
  @Input({ required: true }) summaries: TaskSummary[] = [];

  get totalHours(): number {
    return this.summaries.reduce((sum, s) => sum + s.loggedHours, 0);
  }

  get sorted(): TaskSummary[] {
    return [...this.summaries].sort((a, b) => b.loggedHours - a.loggedHours);
  }

  get maxHours(): number {
    return Math.max(...this.summaries.map(s => s.loggedHours), 1);
  }

  statusLabel(status: string): string {
    return STATUS_LABELS[status] ?? status;
  }

  statusClass(status: string): string {
    return `badge badge-${status}`;
  }

  barWidth(hours: number): string {
    return `${Math.round((hours / this.maxHours) * 100)}%`;
  }
}
