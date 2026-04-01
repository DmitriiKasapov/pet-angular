import { Component, Input } from '@angular/core';
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'app-project-header',
  standalone: true,
  templateUrl: './project-header.html',
})
export class ProjectHeaderComponent {
  @Input({ required: true }) project!: Project;
  @Input() taskCount = 0;
  @Input() totalHours = 0;
}
