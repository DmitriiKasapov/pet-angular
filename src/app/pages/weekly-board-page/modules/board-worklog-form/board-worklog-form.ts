import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { WorklogEntry } from '../../../../models/worklog-entry.model';
import { Task } from '../../../../models/task.model';
import { WeekDay } from '../../weekly-board-page';
import { getDayIndex } from '../../../../core/utils/board-utils';
import { ModalShellComponent } from '../../../../components/elements/modal-shell/modal-shell';

@Component({
  selector: 'app-board-worklog-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ModalShellComponent],
  templateUrl: './board-worklog-form.html',
})
export class BoardWorklogFormComponent implements OnInit {
  @Input() tasks: Task[] = [];
  @Input() weekDays: WeekDay[] = [];
  @Input() initialDate = '';
  @Input() initialStartHour = 9;
  @Input() editEntry: WorklogEntry | null = null;

  @Output() created = new EventEmitter<Omit<WorklogEntry, 'id'>>();
  @Output() updated = new EventEmitter<WorklogEntry>();
  @Output() cancelled = new EventEmitter<void>();

  get isEditMode(): boolean { return this.editEntry !== null; }

  form!: FormGroup;

  searchQuery = '';
  selectedTask: Task | null = null;
  dropdownOpen = false;
  activeIndex = -1;

  get filteredTasks(): Task[] {
    const q = this.searchQuery.toLowerCase();
    if (!q) return this.tasks;
    return this.tasks.filter(t =>
      t.code.toLowerCase().includes(q) || t.title.toLowerCase().includes(q),
    );
  }

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({ comment: [this.editEntry?.comment ?? ''] });
    if (this.editEntry) {
      const task = this.tasks.find(t => t.id === this.editEntry!.taskId);
      if (task) this.selectTask(task);
    }
  }

  selectTask(task: Task): void {
    this.selectedTask = task;
    this.searchQuery = `${task.code} — ${task.title}`;
    this.dropdownOpen = false;
    this.activeIndex = -1;
  }

  onSearchInput(): void {
    this.selectedTask = null;
    this.dropdownOpen = true;
    this.activeIndex = -1;
  }

  onSearchKeydown(event: KeyboardEvent): void {
    const list = this.filteredTasks;
    if (!this.dropdownOpen || list.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex = Math.min(this.activeIndex + 1, list.length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
    } else if (event.key === 'Enter' && this.activeIndex >= 0) {
      event.preventDefault();
      this.selectTask(list[this.activeIndex]);
    } else if (event.key === 'Escape') {
      this.dropdownOpen = false;
      this.activeIndex = -1;
    }
  }

  closeDropdown(): void {
    setTimeout(() => {
      this.dropdownOpen = false;
      this.activeIndex = -1;
    }, 150);
  }

  submit(): void {
    if (!this.selectedTask) return;
    const comment = this.form.value.comment || undefined;
    if (this.editEntry) {
      this.updated.emit({ ...this.editEntry, taskId: this.selectedTask.id, comment });
    } else {
      const dayIndex = getDayIndex(new Date(this.initialDate + 'T00:00:00'));
      this.created.emit({
        taskId: this.selectedTask.id,
        date: this.initialDate,
        dayIndex,
        startHour: this.initialStartHour,
        durationHours: 1,
        comment,
      });
    }
  }
}
