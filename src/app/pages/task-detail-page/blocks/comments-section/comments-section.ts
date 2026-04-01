import { Component, computed, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskComment } from '../../../../models/task-comment.model';
import { CommentsService } from '../../../../core/services/comments.service';
import { PaginationComponent } from '../../../../components/elements/pagination/pagination';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [FormsModule, PaginationComponent],
  templateUrl: './comments-section.html',
})
export class CommentsSectionComponent {
  @Input({ required: true }) comments!: TaskComment[];

  readonly pageSize = PAGE_SIZE;
  readonly page = signal(1);

  readonly paged = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.comments.slice(start, start + PAGE_SIZE);
  });

  editingId = signal<string | null>(null);
  editingText = signal('');

  constructor(private readonly commentsService: CommentsService) {}

  startEdit(comment: TaskComment): void {
    this.editingId.set(comment.id);
    this.editingText.set(comment.text);
  }

  saveEdit(comment: TaskComment): void {
    const text = this.editingText().trim();
    if (!text) return;
    this.commentsService.update(comment.id, text);
    comment.text = text;
    this.editingId.set(null);
  }

  cancelEdit(): void {
    this.editingId.set(null);
  }

  delete(comment: TaskComment): void {
    this.commentsService.delete(comment.id);
    const idx = this.comments.indexOf(comment);
    if (idx !== -1) this.comments.splice(idx, 1);
    // adjust page if current page becomes empty
    const totalPages = Math.ceil(this.comments.length / PAGE_SIZE);
    if (this.page() > totalPages && totalPages > 0) this.page.set(totalPages);
  }
}
