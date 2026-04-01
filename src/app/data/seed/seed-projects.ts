import { Project } from '../../models/project.model';

export const SEED_PROJECTS: Project[] = [
  {
    id: 'proj-001',
    name: 'Internal Portal',
    code: 'INT',
    description: 'Corporate internal portal for HR and document management',
    color: '#3b5bdb',
    createdAt: '2026-01-10',
  },
  {
    id: 'proj-002',
    name: 'E-Commerce Platform',
    code: 'ECP',
    description: 'Online store with product catalog, cart and checkout',
    color: '#2f9e44',
    createdAt: '2026-02-03',
  },
  {
    id: 'proj-003',
    name: 'Mobile CRM',
    code: 'CRM',
    description: 'Customer relationship management for mobile field agents',
    color: '#e67700',
    createdAt: '2026-03-15',
  },
];
