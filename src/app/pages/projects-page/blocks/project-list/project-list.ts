import { Component, computed, EventEmitter, Input, OnChanges, Output, signal } from '@angular/core';
import { ProjectCardComponent } from '../../modules/project-card/project-card';
import { EmptyStateComponent } from '../../../../components/elements/empty-state/empty-state';
import { PaginationComponent } from '../../../../components/elements/pagination/pagination';
import { SearchInputComponent } from '../../../../components/elements/search-input/search-input';
import { ProjectSummary } from '../../projects-page.types';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectCardComponent, EmptyStateComponent, PaginationComponent, SearchInputComponent],
  templateUrl: './project-list.html',
})
export class ProjectListComponent implements OnChanges {
  @Input({ required: true }) summaries: ProjectSummary[] = [];
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
}
