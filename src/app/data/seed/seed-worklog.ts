import { WorklogEntry } from '../../models/worklog-entry.model';

// Week of 2026-03-23 (Mon) – 2026-03-29 (Sun)
export const SEED_WORKLOG: WorklogEntry[] = [
  // INT-003
  { id: 'wl-001', taskId: 'task-003', date: '2026-03-23', dayIndex: 1, startHour: 9, durationHours: 3 },
  { id: 'wl-002', taskId: 'task-003', date: '2026-03-24', dayIndex: 2, startHour: 10, durationHours: 2 },
  { id: 'wl-003', taskId: 'task-003', date: '2026-03-26', dayIndex: 4, startHour: 14, durationHours: 4, comment: 'Finished leave requests widget' },
  // INT-002 (done)
  { id: 'wl-004', taskId: 'task-002', date: '2026-03-23', dayIndex: 1, startHour: 13, durationHours: 2 },
  // ECP-002
  { id: 'wl-005', taskId: 'task-006', date: '2026-03-24', dayIndex: 2, startHour: 9, durationHours: 3 },
  { id: 'wl-006', taskId: 'task-006', date: '2026-03-25', dayIndex: 3, startHour: 11, durationHours: 2, comment: 'Cart total calculation' },
  { id: 'wl-007', taskId: 'task-006', date: '2026-03-27', dayIndex: 5, startHour: 9, durationHours: 3 },
  // ECP-001 (done)
  { id: 'wl-008', taskId: 'task-005', date: '2026-03-25', dayIndex: 3, startHour: 14, durationHours: 2 },
  // CRM-001
  { id: 'wl-009', taskId: 'task-009', date: '2026-03-25', dayIndex: 3, startHour: 9, durationHours: 2 },
  { id: 'wl-010', taskId: 'task-009', date: '2026-03-26', dayIndex: 4, startHour: 9, durationHours: 3 },
  { id: 'wl-011', taskId: 'task-009', date: '2026-03-28', dayIndex: 6, startHour: 10, durationHours: 2, comment: 'Search bar implemented' },
  // INT-003 continued next week
  { id: 'wl-012', taskId: 'task-003', date: '2026-03-30', dayIndex: 1, startHour: 9, durationHours: 3 },
  { id: 'wl-013', taskId: 'task-006', date: '2026-03-31', dayIndex: 2, startHour: 10, durationHours: 2 },
  { id: 'wl-014', taskId: 'task-009', date: '2026-04-01', dayIndex: 3, startHour: 9, durationHours: 4, comment: 'Filter panel done' },
  { id: 'wl-015', taskId: 'task-003', date: '2026-04-01', dayIndex: 3, startHour: 14, durationHours: 2 },
];
