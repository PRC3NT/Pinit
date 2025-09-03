export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  status: 'pending' | 'in_progress' | 'completed';
  attachments?: Attachment[];
  timeToComplete?: number; // in milliseconds
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}
