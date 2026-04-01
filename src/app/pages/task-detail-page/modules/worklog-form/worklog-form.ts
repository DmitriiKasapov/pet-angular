import { Component, Output, EventEmitter, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { WorklogEntry } from '../../../../models/worklog-entry.model';

export type WorklogFormData = Omit<WorklogEntry, 'id' | 'taskId' | 'dayIndex'>;

@Component({
  selector: 'app-worklog-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './worklog-form.html',
})
export class WorklogFormComponent {
  @Output() submitted = new EventEmitter<WorklogFormData>();
  @Output() cancelled = new EventEmitter<void>();

  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    date: [new Date().toISOString().slice(0, 10), Validators.required],
    startHour: [9, [Validators.required, Validators.min(0), Validators.max(23)]],
    durationHours: [1, [Validators.required, Validators.min(0.5), Validators.max(24)]],
    comment: [''],
  });


  submit(): void {
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    this.submitted.emit({
      date: v.date,
      startHour: v.startHour,
      durationHours: v.durationHours,
      comment: v.comment || undefined,
    });
    this.form.reset({
      date: new Date().toISOString().slice(0, 10),
      startHour: 9,
      durationHours: 1,
      comment: '',
    });
  }
}
