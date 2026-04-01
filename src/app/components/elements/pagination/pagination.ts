import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.html',
})
export class PaginationComponent {
  readonly page = input.required<number>();
  readonly total = input.required<number>();
  readonly pageSize = input<number>(6);

  readonly pageChange = output<number>();

  readonly totalPages = computed(() => Math.ceil(this.total() / this.pageSize()));
  readonly hasPrev = computed(() => this.page() > 1);
  readonly hasNext = computed(() => this.page() < this.totalPages());

  prev(): void { this.pageChange.emit(this.page() - 1); }
  next(): void { this.pageChange.emit(this.page() + 1); }
  go(p: number): void { this.pageChange.emit(p); }

  readonly pages = computed(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });
}
