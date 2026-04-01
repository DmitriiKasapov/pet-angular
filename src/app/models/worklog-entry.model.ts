export interface WorklogEntry {
  id: string;
  taskId: string;
  date: string;
  dayIndex: number;
  startHour: number;
  durationHours: number;
  comment?: string;
}
