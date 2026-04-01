import { Component, Input } from '@angular/core';
import { WeekAnalytics } from '../../../../core/services/analytics.service';

@Component({
  selector: 'app-week-summary',
  standalone: true,
  templateUrl: './week-summary.html',
})
export class WeekSummaryComponent {
  @Input({ required: true }) analytics!: WeekAnalytics;
}
