import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '../../../../models/project.model';

const PRESET_COLORS = [
  '#3b5bdb', '#2f9e44', '#e67700', '#c92a2a',
  '#862e9c', '#0c8599', '#364fc7', '#087f5b',
];

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-form.html',
})
export class ProjectFormComponent {
  @Input() existingCodes: string[] = [];
  @Output() created = new EventEmitter<Omit<Project, 'id' | 'createdAt'>>();
  @Output() cancelled = new EventEmitter<void>();

  readonly presetColors = PRESET_COLORS;

  readonly form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    code: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z0-9]{2,8}$/)]),
    description: new FormControl(''),
    color: new FormControl(PRESET_COLORS[0], Validators.required),
  });

  onCodeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const upper = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    this.form.controls.code.setValue(upper, { emitEvent: false });
    input.value = upper;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const code = this.form.value.code!;
    if (this.existingCodes.includes(code)) {
      this.form.controls.code.setErrors({ duplicate: true });
      return;
    }
    this.created.emit({
      name: this.form.value.name!,
      code,
      description: this.form.value.description || undefined,
      color: this.form.value.color!,
    });
  }

  isInvalid(field: 'name' | 'code'): boolean {
    const ctrl = this.form.controls[field];
    return ctrl.invalid && ctrl.touched;
  }
}
