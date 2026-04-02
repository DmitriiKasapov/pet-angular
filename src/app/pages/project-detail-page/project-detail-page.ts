import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmptyStateComponent } from '../../components/elements/empty-state/empty-state';
import { ProjectsService } from '../../core/services/projects.service';
import { TasksService } from '../../core/services/tasks.service';
import { WorklogService } from '../../core/services/worklog.service';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { ProjectHeaderComponent } from './blocks/project-header/project-header';
import { TaskListComponent } from './blocks/task-list/task-list';
import { ProjectAnalyticsComponent } from './blocks/project-analytics/project-analytics';
import { TaskFormComponent } from './modules/task-form/task-form';
import { DetailTab, TaskSummary } from './project-detail-page.types';

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [
    RouterLink,
    ProjectHeaderComponent,
    TaskListComponent,
    ProjectAnalyticsComponent,
    TaskFormComponent,
    EmptyStateComponent,
  ],
  templateUrl: './project-detail-page.html',
})
export class ProjectDetailPageComponent implements OnInit {
  project = signal<Project | null>(null);
  private readonly tasks = signal<Task[]>([]);

  readonly activeTab = signal<DetailTab>('tasks');
  readonly tabs: { value: DetailTab; label: string }[] = [
    { value: 'tasks', label: 'Tasks' },
    { value: 'analytics', label: 'Analytics' },
  ];
  readonly query = signal('');
  readonly showForm = signal(false);

  readonly allTaskSummaries = computed<TaskSummary[]>(() => {
    const entries = this.worklogService.getAll();
    return this.tasks().map(task => ({
      task,
      loggedHours: entries
        .filter(e => e.taskId === task.id)
        .reduce((sum, e) => sum + e.durationHours, 0),
    }));
  });

  readonly filteredSummaries = computed<TaskSummary[]>(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.allTaskSummaries();
    return this.allTaskSummaries().filter(
      s => s.task.code.toLowerCase().includes(q) || s.task.title.toLowerCase().includes(q),
    );
  });

  readonly totalHours = computed(() =>
    this.allTaskSummaries().reduce((sum, s) => sum + s.loggedHours, 0),
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly projectsService: ProjectsService,
    private readonly tasksService: TasksService,
    private readonly worklogService: WorklogService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.project.set(this.projectsService.getById(id) ?? null);
    if (this.project()) {
      this.tasks.set(this.tasksService.getByProject(id));
    }
  }

  onTabKeydown(event: KeyboardEvent): void {
    const idx = this.tabs.findIndex(t => t.value === this.activeTab());
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.activeTab.set(this.tabs[(idx + 1) % this.tabs.length].value);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.activeTab.set(this.tabs[(idx - 1 + this.tabs.length) % this.tabs.length].value);
    }
  }

  onTaskCreated(data: Omit<Task, 'id' | 'code' | 'createdAt' | 'projectId'>): void {
    const proj = this.project()!;
    const created = this.tasksService.create(
      { ...data, projectId: proj.id },
      proj.code,
    );
    this.tasks.update(list => [...list, created]);
    this.showForm.set(false);
  }
}
