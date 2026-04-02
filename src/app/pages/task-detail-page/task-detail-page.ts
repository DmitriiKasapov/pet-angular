import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TasksService } from '../../core/services/tasks.service';
import { CommentsService } from '../../core/services/comments.service';
import { WorklogService } from '../../core/services/worklog.service';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskComment } from '../../models/task-comment.model';
import { WorklogEntry } from '../../models/worklog-entry.model';
import { TaskHeaderComponent } from './blocks/task-header/task-header';
import { WorklogListComponent } from './blocks/worklog-list/worklog-list';
import { CommentsSectionComponent } from './blocks/comments-section/comments-section';
import { CommentFormComponent } from './modules/comment-form/comment-form';
import { WorklogFormComponent, WorklogFormData } from './modules/worklog-form/worklog-form';
import { EmptyStateComponent } from '../../components/elements/empty-state/empty-state';
import { getDayIndex } from '../../core/utils/board-utils';

@Component({
  selector: 'app-task-detail-page',
  standalone: true,
  imports: [
    RouterLink,
    TaskHeaderComponent,
    WorklogListComponent,
    CommentsSectionComponent,
    CommentFormComponent,
    WorklogFormComponent,
    EmptyStateComponent,
  ],
  templateUrl: './task-detail-page.html',
})
export class TaskDetailPageComponent implements OnInit {
  task = signal<Task | null>(null);
  comments = signal<TaskComment[]>([]);
  worklogEntries = signal<WorklogEntry[]>([]);
  showWorklogForm = signal(false);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly tasksService: TasksService,
    private readonly commentsService: CommentsService,
    private readonly worklogService: WorklogService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.task.set(this.tasksService.getById(id) ?? null);
    if (this.task()) {
      this.comments.set(this.commentsService.getByTask(id));
      this.worklogEntries.set(this.worklogService.getByTask(id));
    }
  }

  onStatusChange(status: TaskStatus): void {
    const t = this.task()!;
    this.tasksService.updateStatus(t.id, status);
    this.task.set({ ...t, status });
  }

  onWorklogSubmit(data: WorklogFormData): void {
    const task = this.task()!;
    const dayIndex = getDayIndex(new Date(data.date + 'T00:00:00'));
    const entry = this.worklogService.create({
      taskId: task.id,
      dayIndex,
      ...data,
    });
    this.worklogEntries.update(list => [entry, ...list]);
    this.showWorklogForm.set(false);
  }

  onCommentSubmit(text: string): void {
    const comment = this.commentsService.create(this.task()!.id, text);
    this.comments.update(list => [...list, comment]);
  }
}
