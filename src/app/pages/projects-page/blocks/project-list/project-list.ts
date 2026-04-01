import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectCardComponent } from '../../modules/project-card/project-card';
import { EmptyStateComponent } from '../../../../components/elements/empty-state/empty-state';
import { ProjectSummary } from '../../projects-page.types';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectCardComponent, EmptyStateComponent],
  templateUrl: './project-list.html',
})
export class ProjectListComponent {
  @Input({ required: true }) summaries: ProjectSummary[] = [];
  @Input() query = '';
  @Output() searchChange = new EventEmitter<string>();
  @Output() openForm = new EventEmitter<void>();

  onSearch(event: Event): void {
    this.searchChange.emit((event.target as HTMLInputElement).value);
  }
}
