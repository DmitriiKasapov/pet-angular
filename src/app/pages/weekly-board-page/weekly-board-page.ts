import { Component, OnInit, signal, computed } from '@angular/core';
import { WorklogService } from '../../core/services/worklog.service';
import { TasksService } from '../../core/services/tasks.service';
import { ProjectsService } from '../../core/services/projects.service';
import { WorklogEntry } from '../../models/worklog-entry.model';
import { Task } from '../../models/task.model';
import { Project } from '../../models/project.model';
import { BoardGridComponent } from './blocks/board-grid/board-grid';
import { BoardWorklogFormComponent } from './modules/board-worklog-form/board-worklog-form';
import {
  getWeekStart,
  addDays,
  formatDate,
  getDayIndex,
} from '../../core/utils/board-utils';

export interface WeekDay {
  dayIndex: number;
  date: Date;
  dateStr: string;
  label: string;
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

@Component({
  selector: 'app-weekly-board-page',
  standalone: true,
  imports: [BoardGridComponent, BoardWorklogFormComponent],
  templateUrl: './weekly-board-page.html',
})
export class WeeklyBoardPageComponent implements OnInit {
  weekStart = signal<Date>(getWeekStart(new Date()));
  entries = signal<WorklogEntry[]>([]);
  showForm = signal(false);
  formDefaults = signal<{ date: string; startHour: number }>({ date: formatDate(new Date()), startHour: 9 });
  editingEntry = signal<WorklogEntry | null>(null);

  weekDays = computed<WeekDay[]>(() =>
    Array.from({ length: 7 }, (_, i) => {
      const date = addDays(this.weekStart(), i);
      return {
        dayIndex: i + 1,
        date,
        dateStr: formatDate(date),
        label: `${DAY_LABELS[i]} ${date.getDate()}`,
      };
    })
  );

  tasks = computed<Task[]>(() => this.tasksService.getAll());
  projects = computed<Project[]>(() => this.projectsService.getAll());

  weekLabel = computed(() => {
    const start = this.weekStart();
    const end = addDays(start, 6);
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  });

  constructor(
    private worklogService: WorklogService,
    private tasksService: TasksService,
    private projectsService: ProjectsService,
  ) {}

  ngOnInit(): void {
    this.loadEntries();
  }

  prevWeek(): void {
    this.weekStart.set(addDays(this.weekStart(), -7));
    this.loadEntries();
  }

  nextWeek(): void {
    this.weekStart.set(addDays(this.weekStart(), 7));
    this.loadEntries();
  }

  loadEntries(): void {
    this.entries.set(this.worklogService.getByWeek(formatDate(this.weekStart())));
  }

  onEntryUpdated(updated: WorklogEntry): void {
    this.worklogService.update(updated.id, updated);
    this.entries.update(list => list.map(e => e.id === updated.id ? updated : e));
  }

  onEntryDeleted(id: string): void {
    this.worklogService.delete(id);
    this.entries.update(list => list.filter(e => e.id !== id));
  }

  onEntryEdit(entry: WorklogEntry): void {
    this.editingEntry.set(entry);
  }

  onEntryUpdatedFromForm(updated: WorklogEntry): void {
    this.worklogService.update(updated.id, updated);
    this.entries.update(list => list.map(e => e.id === updated.id ? updated : e));
    this.editingEntry.set(null);
  }

  onColumnClick(event: { dateStr: string; startHour: number }): void {
    this.formDefaults.set({ date: event.dateStr, startHour: event.startHour });
    this.showForm.set(true);
  }

  onEntryCreated(data: Omit<WorklogEntry, 'id'>): void {
    const entry = this.worklogService.create(data);
    // Only add to view if it belongs to the current week
    const weekStr = formatDate(this.weekStart());
    if (this.worklogService.getByWeek(weekStr).some(e => e.id === entry.id)) {
      this.entries.update(list => [...list, entry]);
    }
    this.showForm.set(false);
  }
}
