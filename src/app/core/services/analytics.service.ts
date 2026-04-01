import { Injectable } from '@angular/core';
import { WorklogService } from './worklog.service';
import { TasksService } from './tasks.service';
import { ProjectsService } from './projects.service';
import { addDays, formatDate } from '../utils/board-utils';

export interface DaySummary {
  dayIndex: number;  // 1=Mon … 7=Sun
  label: string;
  dateStr: string;
  hours: number;
}

export interface ProjectSummary {
  projectId: string;
  code: string;
  name: string;
  color: string;
  hours: number;
}

export interface TaskSummary {
  taskId: string;
  code: string;
  title: string;
  status: string;
  projectCode: string;
  projectName: string;
  hours: number;
}

export interface WeekAnalytics {
  totalHours: number;
  entryCount: number;
  days: DaySummary[];
  projects: ProjectSummary[];
  tasks: TaskSummary[];
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  constructor(
    private worklog: WorklogService,
    private tasks: TasksService,
    private projects: ProjectsService,
  ) {}

  getWeekAnalytics(weekStart: Date): WeekAnalytics {
    const weekStartStr = formatDate(weekStart);
    const entries = this.worklog.getByWeek(weekStartStr);
    const allTasks = this.tasks.getAll();
    const allProjects = this.projects.getAll();

    const totalHours = entries.reduce((s, e) => s + e.durationHours, 0);

    // Days summary — always 7 days
    const days: DaySummary[] = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(weekStart, i);
      const dateStr = formatDate(date);
      const hours = entries
        .filter(e => e.date === dateStr)
        .reduce((s, e) => s + e.durationHours, 0);
      return {
        dayIndex: i + 1,
        label: `${DAY_LABELS[i]} ${date.getDate()}`,
        dateStr,
        hours,
      };
    });

    // Projects summary
    const projectHoursMap = new Map<string, number>();
    for (const entry of entries) {
      const task = allTasks.find(t => t.id === entry.taskId);
      if (!task) continue;
      projectHoursMap.set(task.projectId, (projectHoursMap.get(task.projectId) ?? 0) + entry.durationHours);
    }
    const projects: ProjectSummary[] = [...projectHoursMap.entries()]
      .map(([projectId, hours]) => {
        const project = allProjects.find(p => p.id === projectId);
        return {
          projectId,
          code: project?.code ?? '?',
          name: project?.name ?? 'Unknown',
          color: project?.color ?? '#ccc',
          hours,
        };
      })
      .sort((a, b) => b.hours - a.hours);

    // Tasks summary
    const taskHoursMap = new Map<string, number>();
    for (const entry of entries) {
      taskHoursMap.set(entry.taskId, (taskHoursMap.get(entry.taskId) ?? 0) + entry.durationHours);
    }
    const tasks: TaskSummary[] = [...taskHoursMap.entries()]
      .map(([taskId, hours]) => {
        const task = allTasks.find(t => t.id === taskId);
        const project = allProjects.find(p => p.id === task?.projectId);
        return {
          taskId,
          code: task?.code ?? '?',
          title: task?.title ?? 'Unknown',
          status: task?.status ?? '',
          projectCode: project?.code ?? '?',
          projectName: project?.name ?? 'Unknown',
          hours,
        };
      })
      .sort((a, b) => b.hours - a.hours);

    return { totalHours, entryCount: entries.length, days, projects, tasks };
  }
}
