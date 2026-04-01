import { Component, Input } from '@angular/core';
import { DaySummary } from '../../../../core/services/analytics.service';

@Component({
  selector: 'app-days-summary',
  standalone: true,
  templateUrl: './days-summary.html',
})
export class DaysSummaryComponent {
  @Input({ required: true }) days!: DaySummary[];

  get maxHours(): number {
    return Math.max(...this.days.map(d => d.hours), 1);
  }

  barWidth(hours: number): number {
    return Math.round((hours / this.maxHours) * 100);
  }
}
