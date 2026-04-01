import { Component, computed, EventEmitter, Input, OnChanges, Output, signal } from '@angular/core';
import { TaskCardComponent } from '../../modules/task-card/task-card';
import { EmptyStateComponent } from '../../../../components/elements/empty-state/empty-state';
import { PaginationComponent } from '../../../../components/elements/pagination/pagination';
import { TaskSummary } from '../../project-detail-page.types';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent, EmptyStateComponent, PaginationComponent],
  templateUrl: './task-list.html',
})
export class TaskListComponent implements OnChanges {
  @Input({ required: true }) summaries: TaskSummary[] = [];
  @Input() query = '';
  @Output() searchChange = new EventEmitter<string>();
  @Output() openForm = new EventEmitter<void>();

  readonly pageSize = PAGE_SIZE;
  readonly page = signal(1);

  readonly paged = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.summaries.slice(start, start + PAGE_SIZE);
  });

  ngOnChanges(): void {
    this.page.set(1);
  }

  onSearch(event: Event): void {
    this.searchChange.emit((event.target as HTMLInputElement).value);
  }
}
