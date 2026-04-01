import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../core/services/analytics.service';
import { WeekSummaryComponent } from './blocks/week-summary/week-summary';
import { DaysSummaryComponent } from './blocks/days-summary/days-summary';
import { ProjectsSummaryComponent } from './blocks/projects-summary/projects-summary';
import { TasksSummaryComponent } from './blocks/tasks-summary/tasks-summary';
import { getWeekStart, addDays, formatDate } from '../../core/utils/board-utils';

@Component({
  selector: 'app-analytics-page',
  standalone: true,
  imports: [RouterLink, WeekSummaryComponent, DaysSummaryComponent, ProjectsSummaryComponent, TasksSummaryComponent],
  templateUrl: './analytics-page.html',
})
export class AnalyticsPageComponent {
  weekStart = signal<Date>(getWeekStart(new Date()));

  weekLabel = computed(() => {
    const start = this.weekStart();
    const end = addDays(start, 6);
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  });

  analytics = computed(() => this.analyticsService.getWeekAnalytics(this.weekStart()));

  isCurrentWeek = computed(() => formatDate(this.weekStart()) === formatDate(getWeekStart(new Date())));

  constructor(private analyticsService: AnalyticsService) {}

  prevWeek(): void { this.weekStart.set(addDays(this.weekStart(), -7)); }
  nextWeek(): void { this.weekStart.set(addDays(this.weekStart(), 7)); }
  goToday(): void { this.weekStart.set(getWeekStart(new Date())); }
}
