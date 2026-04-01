import { TaskComment } from '../../models/task-comment.model';

export const SEED_COMMENTS: TaskComment[] = [
  {
    id: 'cmt-001',
    taskId: 'task-003',
    text: 'Need to confirm leave request approval flow with HR team before implementation.',
    createdAt: '2026-01-22',
  },
  {
    id: 'cmt-002',
    taskId: 'task-003',
    text: 'Org chart component will use recursive tree rendering.',
    createdAt: '2026-02-05',
  },
  {
    id: 'cmt-003',
    taskId: 'task-006',
    text: 'Discussed with backend — cart state will be stored in localStorage for now.',
    createdAt: '2026-02-12',
  },
  {
    id: 'cmt-004',
    taskId: 'task-007',
    text: 'Payment integration is out of MVP scope — will use a mock success screen.',
    createdAt: '2026-02-22',
  },
  {
    id: 'cmt-005',
    taskId: 'task-009',
    text: 'Decided to use virtual scrolling for large client lists.',
    createdAt: '2026-03-17',
  },
];
