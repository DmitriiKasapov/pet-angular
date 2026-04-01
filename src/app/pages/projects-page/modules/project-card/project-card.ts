import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectSummary } from '../../projects-page.types';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-card.html',
})
export class ProjectCardComponent {
  @Input({ required: true }) summary!: ProjectSummary;
}
