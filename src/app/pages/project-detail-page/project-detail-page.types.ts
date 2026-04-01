import { Task } from '../../models/task.model';

export type DetailTab = 'tasks' | 'analytics';

export interface TaskSummary {
  task: Task;
  loggedHours: number;
}
