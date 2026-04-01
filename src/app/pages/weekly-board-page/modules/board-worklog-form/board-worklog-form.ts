import { Component, Input, Output, EventEmitter, OnInit, signal, computed } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { WorklogEntry } from '../../../../models/worklog-entry.model';
import { Task } from '../../../../models/task.model';
import { WeekDay } from '../../weekly-board-page';
import { getDayIndex } from '../../../../core/utils/board-utils';

@Component({
  selector: 'app-board-worklog-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './board-worklog-form.html',
})
export class BoardWorklogFormComponent implements OnInit {
  @Input() tasks: Task[] = [];
  @Input() weekDays: WeekDay[] = [];
  @Input() initialDate: string = '';
  @Input() initialStartHour: number = 9;
  @Input() editEntry: WorklogEntry | null = null;

  @Output() created = new EventEmitter<Omit<WorklogEntry, 'id'>>();
  @Output() updated = new EventEmitter<WorklogEntry>();
  @Output() cancelled = new EventEmitter<void>();

  get isEditMode(): boolean { return this.editEntry !== null; }

  form!: FormGroup;

  // Task search
  searchQuery = '';
  selectedTask: Task | null = null;
  dropdownOpen = false;

  get filteredTasks(): Task[] {
    const q = this.searchQuery.toLowerCase();
    if (!q) return this.tasks;
    return this.tasks.filter(t =>
      t.code.toLowerCase().includes(q) || t.title.toLowerCase().includes(q)
    );
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      comment: [this.editEntry?.comment ?? ''],
    });
    if (this.editEntry) {
      const task = this.tasks.find(t => t.id === this.editEntry!.taskId);
      if (task) this.selectTask(task);
    }
  }

  selectTask(task: Task): void {
    this.selectedTask = task;
    this.searchQuery = `${task.code} — ${task.title}`;
    this.dropdownOpen = false;
  }

  onSearchInput(): void {
    this.selectedTask = null;
    this.dropdownOpen = true;
  }

  closeDropdown(): void {
    // Delay to allow click on option to register
    setTimeout(() => { this.dropdownOpen = false; }, 150);
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
