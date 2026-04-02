import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskComment } from '../../../../models/task-comment.model';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './comment-card.html',
})
export class CommentCardComponent {
  @Input({ required: true }) comment!: TaskComment;
  @Output() saved = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<void>();

  readonly isEditing = signal(false);
  readonly editText = signal('');

  startEdit(): void {
    this.editText.set(this.comment.text);
    this.isEditing.set(true);
  }

  save(): void {
    const text = this.editText().trim();
    if (!text) return;
    this.saved.emit(text);
    this.isEditing.set(false);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
  }
}
