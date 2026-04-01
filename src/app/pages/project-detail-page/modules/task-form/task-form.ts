import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskStatus } from '../../../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
})
export class TaskFormComponent {
  @Output() created = new EventEmitter<Omit<Task, 'id' | 'code' | 'createdAt' | 'projectId'>>();
  @Output() cancelled = new EventEmitter<void>();

  readonly statusOptions: { value: TaskStatus; label: string }[] = [
    { value: 'planning', label: 'Planning' },
    { value: 'progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
  ];

  readonly form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl(''),
    status: new FormControl<TaskStatus>('planning', Validators.required),
    estimatedHours: new FormControl<number | null>(null, [Validators.min(0.5), Validators.max(999)]),
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.created.emit({
      title: this.form.value.title!,
      description: this.form.value.description || undefined,
      status: this.form.value.status!,
      estimatedHours: this.form.value.estimatedHours ?? undefined,
    });
  }

  isInvalid(field: 'title' | 'estimatedHours'): boolean {
    const ctrl = this.form.controls[field];
    return ctrl.invalid && ctrl.touched;
  }
}
