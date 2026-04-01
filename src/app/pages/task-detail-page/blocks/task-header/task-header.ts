import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Task, TaskStatus } from '../../../../models/task.model';

@Component({
  selector: 'app-task-header',
  standalone: true,
  imports: [RouterLink, NgStyle],
  templateUrl: './task-header.html',
})
export class TaskHeaderComponent {
  @Input({ required: true }) task!: Task;
  @Output() statusChange = new EventEmitter<TaskStatus>();

  readonly statuses: { value: TaskStatus; label: string; bg: string; color: string }[] = [
    { value: 'planning', label: 'Planning',   bg: 'var(--color-status-planning-bg)',  color: 'var(--color-status-planning-text)' },
    { value: 'progress', label: 'In Progress', bg: 'var(--color-status-progress-bg)', color: 'var(--color-status-progress-text)' },
    { value: 'done',     label: 'Done',        bg: 'var(--color-status-done-bg)',     color: 'var(--color-status-done-text)' },
  ];

  selectStyle(status: TaskStatus): Record<string, string> {
    const s = this.statuses.find(x => x.value === status)!;
    return { 'background-color': s.bg, color: s.color, 'border-color': s.color };
  }

  readonly statusLabels: Record<TaskStatus, string> = {
    planning: 'Planning',
    progress: 'In Progress',
    done: 'Done',
  };

  badgeClass(status: TaskStatus): string {
    return `badge badge-${status}`;
  }

  onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as TaskStatus;
    this.statusChange.emit(value);
  }
}
