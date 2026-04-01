import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="components__elements__empty-state flex flex-col items-center justify-center py-16 text-center">
      <p class="text-base font-medium" style="color: var(--color-text)">{{ title }}</p>
      @if (description) {
        <p class="text-sm mt-1" style="color: var(--color-text-muted)">{{ description }}</p>
      }
      <div class="mt-4">
        <ng-content />
      </div>
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() title = 'Nothing here yet';
  @Input() description = '';
}
