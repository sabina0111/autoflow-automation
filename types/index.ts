// Type definitions for our data models

export interface User {
  id: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'email' | 'date' | 'select' | 'checkbox';
  required: boolean;
  options?: string[]; // for select fields
  order: number;
}

export interface Workflow {
  id: string;
  userId: string;
  name: string;
  description?: string;
  fields: WorkflowField[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowRecord {
  id: string;
  workflowId: string;
  userId: string;
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalyticsData {
  totalWorkflows: number;
  totalRecords: number;
  recentActivity: number;
  usersCount: number;
}
