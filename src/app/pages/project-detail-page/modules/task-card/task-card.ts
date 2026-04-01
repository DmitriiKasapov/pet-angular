import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskSummary } from '../../project-detail-page.types';

const STATUS_LABELS: Record<string, string> = {
  planning: 'Planning',
  progress: 'In Progress',
  done: 'Done',
};

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './task-card.html',
})
export class TaskCardComponent {
  @Input({ required: true }) summary!: TaskSummary;

  get statusLabel(): string {
    return STATUS_LABELS[this.summary.task.status] ?? this.summary.task.status;
  }

  get statusClass(): string {
    return `badge badge-${this.summary.task.status}`;
  }
}
