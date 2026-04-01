import { Component, OnInit, computed, signal } from '@angular/core';
import { ProjectsService } from '../../core/services/projects.service';
import { TasksService } from '../../core/services/tasks.service';
import { WorklogService } from '../../core/services/worklog.service';
import { Project } from '../../models/project.model';
import { ProjectListComponent } from './blocks/project-list/project-list';
import { ProjectFormComponent } from './modules/project-form/project-form';
import { ProjectSummary } from './projects-page.types';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [ProjectListComponent, ProjectFormComponent],
  templateUrl: './projects-page.html',
})
export class ProjectsPageComponent implements OnInit {
  private readonly projects = signal<Project[]>([]);

  readonly query = signal('');
  readonly showForm = signal(false);

  readonly existingCodes = computed(() => this.projects().map(p => p.code));

  readonly summaries = computed<ProjectSummary[]>(() => {
    const q = this.query().trim().toLowerCase();
    const tasks = this.tasksService.getAll();
    const entries = this.worklogService.getAll();

    // Map projectId → tasks
    const tasksByProject = new Map<string, typeof tasks>();
    for (const t of tasks) {
      const arr = tasksByProject.get(t.projectId) ?? [];
      arr.push(t);
      tasksByProject.set(t.projectId, arr);
    }

    // Map projectId → total logged hours
    const hoursByProject = new Map<string, number>();
    for (const e of entries) {
      const task = tasks.find(t => t.id === e.taskId);
      if (!task) continue;
      hoursByProject.set(task.projectId, (hoursByProject.get(task.projectId) ?? 0) + e.durationHours);
    }

    return this.projects()
      .filter(p => {
        if (!q) return true;
        if (p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)) return true;
        const ptasks = tasksByProject.get(p.id) ?? [];
        return ptasks.some(t => t.code.toLowerCase().includes(q) || t.title.toLowerCase().includes(q));
      })
      .map(p => ({
        project: p,
        taskCount: (tasksByProject.get(p.id) ?? []).length,
        totalHours: hoursByProject.get(p.id) ?? 0,
      }));
  });

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly tasksService: TasksService,
    private readonly worklogService: WorklogService,
  ) {}

  ngOnInit(): void {
    this.projects.set(this.projectsService.getAll());
  }

  onProjectCreated(data: Omit<Project, 'id' | 'createdAt'>): void {
    const created = this.projectsService.create(data);
    this.projects.update(list => [...list, created]);
    this.showForm.set(false);
  }
}
