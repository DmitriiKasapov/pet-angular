import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { WorklogEntry } from '../../../../models/worklog-entry.model';

export interface WorklogBlockInfo {
  color: string;
  code: string;
  title: string;
}

@Component({
  selector: 'app-worklog-block',
  standalone: true,
  templateUrl: './worklog-block.html',
  styleUrl: './worklog-block.scss',
  host: { '(click)': '$event.stopPropagation()' },
})
export class WorklogBlockComponent {
  /** Native element reference — used by parent for drag calculations */
  get el(): HTMLElement { return this.hostRef.nativeElement; }

  constructor(private readonly hostRef: ElementRef<HTMLElement>) {}
  @Input({ required: true }) entry!: WorklogEntry;
  @Input({ required: true }) taskInfo!: WorklogBlockInfo;
  @Input() isDragging = false;
  @Input() isResizing = false;

  @Output() dragStart = new EventEmitter<MouseEvent>();
  @Output() resizeStart = new EventEmitter<MouseEvent>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
}
