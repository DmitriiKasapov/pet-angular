import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TasksService } from '../../core/services/tasks.service';
import { CommentsService } from '../../core/services/comments.service';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskComment } from '../../models/task-comment.model';
import { TaskHeaderComponent } from './blocks/task-header/task-header';
import { CommentsSectionComponent } from './blocks/comments-section/comments-section';
import { CommentFormComponent } from './modules/comment-form/comment-form';

@Component({
  selector: 'app-task-detail-page',
  standalone: true,
  imports: [
    RouterLink,
    TaskHeaderComponent,
    CommentsSectionComponent,
    CommentFormComponent,
  ],
  templateUrl: './task-detail-page.html',
})
export class TaskDetailPageComponent implements OnInit {
  task = signal<Task | null>(null);
  comments = signal<TaskComment[]>([]);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly tasksService: TasksService,
    private readonly commentsService: CommentsService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.task.set(this.tasksService.getById(id) ?? null);
    if (this.task()) {
      this.comments.set(this.commentsService.getByTask(id));
    }
  }

  onStatusChange(status: TaskStatus): void {
    const t = this.task()!;
    this.tasksService.updateStatus(t.id, status);
    this.task.set({ ...t, status });
  }

  onCommentSubmit(text: string): void {
    const comment = this.commentsService.create(this.task()!.id, text);
    this.comments.update(list => [...list, comment]);
  }
}
