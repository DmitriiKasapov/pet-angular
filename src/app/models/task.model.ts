export type TaskStatus = 'planning' | 'progress' | 'done';

export interface Task {
  id: string;
  projectId: string;
  code: string;
  title: string;
  description?: string;
  status: TaskStatus;
  estimatedHours?: number;
  createdAt: string;
}
