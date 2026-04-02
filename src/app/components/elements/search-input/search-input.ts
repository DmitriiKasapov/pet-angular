import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.html',
})
export class SearchInputComponent {
  @Input() value = '';
  @Input() placeholder = 'Search…';
  @Input() ariaLabel = 'Search';
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event): void {
    this.valueChange.emit((event.target as HTMLInputElement).value);
  }
}
