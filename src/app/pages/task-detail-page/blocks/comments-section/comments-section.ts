import { Component, computed, Input, signal } from '@angular/core';
import { TaskComment } from '../../../../models/task-comment.model';
import { CommentsService } from '../../../../core/services/comments.service';
import { PaginationComponent } from '../../../../components/elements/pagination/pagination';
import { CommentCardComponent } from '../../modules/comment-card/comment-card';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [PaginationComponent, CommentCardComponent],
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

  constructor(private readonly commentsService: CommentsService) {}

  onSaved(comment: TaskComment, newText: string): void {
    this.commentsService.update(comment.id, newText);
    comment.text = newText;
  }

  onDeleted(comment: TaskComment): void {
    this.commentsService.delete(comment.id);
    const idx = this.comments.indexOf(comment);
    if (idx !== -1) this.comments.splice(idx, 1);
    const totalPages = Math.ceil(this.comments.length / PAGE_SIZE);
    if (this.page() > totalPages && totalPages > 0) this.page.set(totalPages);
  }
}
