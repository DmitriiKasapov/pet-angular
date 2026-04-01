import { Project } from '../../models/project.model';

export interface ProjectSummary {
  project: Project;
  taskCount: number;
  totalHours: number;
}
