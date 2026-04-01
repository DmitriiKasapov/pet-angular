import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewChildren,
  computed,
  signal,
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { WorklogBlockComponent } from '../../modules/worklog-block/worklog-block';
import { WorklogEntry } from '../../../../models/worklog-entry.model';
import { Task } from '../../../../models/task.model';
import { Project } from '../../../../models/project.model';
import { WeekDay } from '../../weekly-board-page';
import {
  HOUR_HEIGHT,
  SNAP_HOURS,
  MIN_DURATION,
  snapToGrid,
  clampHours,
  formatDate,
} from '../../../../core/utils/board-utils';

interface DragState {
  entryId: string;
  originalDayIndex: number;
  originalStartHour: number;
  originalDurationHours: number;
  startMouseX: number;
  startMouseY: number;
  currentMouseX: number;
  currentMouseY: number;
  blockOffsetX: number;
  blockOffsetY: number;
  blockWidth: number;
}

interface ResizeState {
  entryId: string;
  originalDuration: number;
  originalStartHour: number;
  startMouseY: number;
  currentMouseY: number;
}

@Component({
  selector: 'app-board-grid',
  standalone: true,
  imports: [NgStyle, WorklogBlockComponent],
  templateUrl: './board-grid.html',
})
export class BoardGridComponent implements AfterViewInit {
  @Input() entries: WorklogEntry[] = [];
  @Input() tasks: Task[] = [];
  @Input() projects: Project[] = [];
  @Input() weekDays: WeekDay[] = [];

  @Output() entryUpdated = new EventEmitter<WorklogEntry>();
  @Output() entryDeleted = new EventEmitter<string>();
  @Output() entryEdit = new EventEmitter<WorklogEntry>();
  @Output() columnClick = new EventEmitter<{ dateStr: string; startHour: number }>();

  @ViewChildren('columnEl') columnEls!: QueryList<ElementRef<HTMLElement>>;

  readonly HOUR_HEIGHT = HOUR_HEIGHT;
  readonly DAILY_NORM = 8;
  /** Hour labels: 0..24 */
  readonly hours = Array.from({ length: 25 }, (_, i) => i);
  readonly todayStr = formatDate(new Date());

  constructor(private readonly hostEl: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    // Scroll to 5:00 AM on load (header height = 40px)
    this.hostEl.nativeElement.scrollTop = 5 * HOUR_HEIGHT - 40;
  }

  dragState = signal<DragState | null>(null);
  resizeState = signal<ResizeState | null>(null);

  // Maps taskId → { color, code, title }
  taskInfoMap = computed(() => {
    const map = new Map<string, { color: string; code: string; title: string }>();
    for (const task of this.tasks) {
      const project = this.projects.find(p => p.id === task.projectId);
      map.set(task.id, {
        color: project?.color ?? '#3b5bdb',
        code: task.code,
        title: task.title,
      });
    }
    return map;
  });

  resizePreviewHeight = computed(() => {
    const rs = this.resizeState();
    if (!rs) return 0;
    const dy = rs.currentMouseY - rs.startMouseY;
    return (
      snapToGrid(clampHours(rs.originalDuration + dy / HOUR_HEIGHT, MIN_DURATION, 24 - rs.originalStartHour)) *
      HOUR_HEIGHT
    );
  });

  entriesForDay(dayIndex: number): WorklogEntry[] {
    return this.entries.filter(e => e.dayIndex === dayIndex);
  }

  hoursForDay(dayIndex: number): number {
    return this.entriesForDay(dayIndex).reduce((sum, e) => sum + e.durationHours, 0);
  }

  blockTop(entry: WorklogEntry): number {
    return entry.startHour * HOUR_HEIGHT;
  }

  blockHeight(entry: WorklogEntry): number {
    const rs = this.resizeState();
    if (rs?.entryId === entry.id) return this.resizePreviewHeight();
    return entry.durationHours * HOUR_HEIGHT;
  }

  isDragging(entryId: string): boolean {
    return this.dragState()?.entryId === entryId;
  }

  isResizing(entryId: string): boolean {
    return this.resizeState()?.entryId === entryId;
  }

  getTaskInfo(taskId: string): { color: string; code: string; title: string } {
    return this.taskInfoMap().get(taskId) ?? { color: '#3b5bdb', code: '', title: 'Unknown' };
  }

  getDragEntry(): WorklogEntry | null {
    const ds = this.dragState();
    if (!ds) return null;
    return this.entries.find(e => e.id === ds.entryId) ?? null;
  }

  dragFloatStyle(): Record<string, string> {
    const ds = this.dragState();
    if (!ds) return {};
    return {
      left: ds.currentMouseX - ds.blockOffsetX + 'px',
      top: ds.currentMouseY - ds.blockOffsetY + 'px',
      width: ds.blockWidth + 'px',
    };
  }

  dragPreviewForDay(dayIndex: number): number | null {
    const ds = this.dragState();
    if (!ds) return null;
    const targetDay = this.getColumnDayIndexAtX(ds.currentMouseX);
    if (targetDay !== dayIndex) return null;
    const colEl = this.getColumnElForDay(dayIndex);
    if (!colEl) return null;
    const colTop = colEl.getBoundingClientRect().top;
    return snapToGrid(
      clampHours((ds.currentMouseY - ds.blockOffsetY - colTop) / HOUR_HEIGHT, 0, 24 - ds.originalDurationHours)
    );
  }

  onColumnClick(event: MouseEvent, day: WeekDay): void {
    const colEl = event.currentTarget as HTMLElement;
    const colRect = colEl.getBoundingClientRect();
    const startHour = snapToGrid(clampHours((event.clientY - colRect.top) / HOUR_HEIGHT, 0, 23.5));
    this.columnClick.emit({ dateStr: day.dateStr, startHour });
  }

  onBlockDragStart(entry: WorklogEntry, event: MouseEvent, blockEl: HTMLElement): void {
    event.preventDefault();
    const rect = blockEl.getBoundingClientRect();
    this.dragState.set({
      entryId: entry.id,
      originalDayIndex: entry.dayIndex,
      originalStartHour: entry.startHour,
      originalDurationHours: entry.durationHours,
      startMouseX: event.clientX,
      startMouseY: event.clientY,
      currentMouseX: event.clientX,
      currentMouseY: event.clientY,
      blockOffsetX: event.clientX - rect.left,
      blockOffsetY: event.clientY - rect.top,
      blockWidth: rect.width,
    });
  }

  onBlockResizeStart(entry: WorklogEntry, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.resizeState.set({
      entryId: entry.id,
      originalDuration: entry.durationHours,
      originalStartHour: entry.startHour,
      startMouseY: event.clientY,
      currentMouseY: event.clientY,
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const ds = this.dragState();
    if (ds) {
      this.dragState.set({ ...ds, currentMouseX: event.clientX, currentMouseY: event.clientY });
    }
    const rs = this.resizeState();
    if (rs) {
      this.resizeState.set({ ...rs, currentMouseY: event.clientY });
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    const ds = this.dragState();
    if (ds) {
      const targetDayIndex = this.getColumnDayIndexAtX(event.clientX) ?? ds.originalDayIndex;
      const colEl = this.getColumnElForDay(targetDayIndex);
      const colTop = colEl?.getBoundingClientRect().top ?? 0;
      const newStartHour = snapToGrid(
        clampHours((event.clientY - ds.blockOffsetY - colTop) / HOUR_HEIGHT, 0, 24 - ds.originalDurationHours)
      );
      const newDate = this.weekDays.find(d => d.dayIndex === targetDayIndex)?.dateStr ?? '';
      const entry = this.entries.find(e => e.id === ds.entryId);
      if (entry && newDate) {
        this.entryUpdated.emit({
          ...entry,
          dayIndex: targetDayIndex,
          startHour: newStartHour,
          date: newDate,
        });
      }
      this.dragState.set(null);
    }

    const rs = this.resizeState();
    if (rs) {
      const dy = event.clientY - rs.startMouseY;
      const newDuration = snapToGrid(
        clampHours(rs.originalDuration + dy / HOUR_HEIGHT, MIN_DURATION, 24 - rs.originalStartHour)
      );
      const entry = this.entries.find(e => e.id === rs.entryId);
      if (entry) {
        this.entryUpdated.emit({ ...entry, durationHours: newDuration });
      }
      this.resizeState.set(null);
    }
  }

  private getColumnElForDay(dayIndex: number): HTMLElement | null {
    return this.columnEls?.toArray()[dayIndex - 1]?.nativeElement ?? null;
  }

  private getColumnDayIndexAtX(clientX: number): number | null {
    const cols = this.columnEls?.toArray();
    if (!cols) return null;
    for (let i = 0; i < cols.length; i++) {
      const rect = cols[i].nativeElement.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right) return i + 1;
    }
    return null;
  }
}
