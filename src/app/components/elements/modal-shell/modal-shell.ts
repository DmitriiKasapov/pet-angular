import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal-shell',
  standalone: true,
  templateUrl: './modal-shell.html',
  host: { '(document:keydown.escape)': 'onEscape()' },
})
export class ModalShellComponent implements OnInit, OnDestroy {
  @Input({ required: true }) title!: string;
  @Output() closed = new EventEmitter<void>();

  @ViewChild('panel') panelRef!: ElementRef<HTMLElement>;

  private previousFocus: Element | null = null;

  ngOnInit(): void {
    this.previousFocus = document.activeElement;
    // Defer focus so the panel is rendered
    setTimeout(() => this.panelRef?.nativeElement.focus(), 0);
  }

  ngOnDestroy(): void {
    (this.previousFocus as HTMLElement | null)?.focus();
  }

  onEscape(): void {
    this.closed.emit();
  }
}
