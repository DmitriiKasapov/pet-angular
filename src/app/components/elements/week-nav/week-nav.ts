import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-week-nav',
  standalone: true,
  templateUrl: './week-nav.html',
})
export class WeekNavComponent {
  @Input({ required: true }) label!: string;
  @Input() isCurrentWeek = true;
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() goToday = new EventEmitter<void>();
}
