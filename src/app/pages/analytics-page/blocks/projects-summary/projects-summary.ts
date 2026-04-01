import { Component, Input } from '@angular/core';
import { ProjectSummary } from '../../../../core/services/analytics.service';

@Component({
  selector: 'app-projects-summary',
  standalone: true,
  templateUrl: './projects-summary.html',
})
export class ProjectsSummaryComponent {
  @Input({ required: true }) projects!: ProjectSummary[];

  get maxHours(): number {
    return Math.max(...this.projects.map(p => p.hours), 1);
  }

  barWidth(hours: number): number {
    return Math.round((hours / this.maxHours) * 100);
  }
}
