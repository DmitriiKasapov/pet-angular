import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskCardComponent } from '../../modules/task-card/task-card';
import { EmptyStateComponent } from '../../../../components/elements/empty-state/empty-state';
import { TaskSummary } from '../../project-detail-page.types';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent, EmptyStateComponent],
  templateUrl: './task-list.html',
})
export class TaskListComponent {
  @Input({ required: true }) summaries: TaskSummary[] = [];
  @Input() query = '';
  @Output() searchChange = new EventEmitter<string>();
  @Output() openForm = new EventEmitter<void>();

  onSearch(event: Event): void {
    this.searchChange.emit((event.target as HTMLInputElement).value);
  }
}
