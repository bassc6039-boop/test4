
export enum HomeworkStatus {
  ASSIGNED = 'assigned',
  IN_PROGRESS = 'in_progress',
  UPLOADED = 'uploaded',
  CHECKED = 'checked',
  OVERDUE = 'overdue'
}

export interface Teacher {
  id: string;
  name: string;
  avatar: string;
}

export interface Homework {
  id: string;
  subject: string;
  topic: string;
  description: string;
  dateAssigned: string; // ISO Date
  dateDeadline: string; // ISO Date
  status: HomeworkStatus;
  grade?: number;
  maxGrade?: number;
  teacher: Teacher;
  files?: { name: string; url: string; size: string }[];
  comment?: string;
}

export interface UserProfile {
  name: string;
  group: string;
  avatar: string;
  coins: number;
  crystals: number;
  email: string;
  phone: string;
  github: string;
  dob: string;
}

export type ViewType = 
  | 'dashboard' 
  | 'schedule' 
  | 'performance'
  | 'journal' 
  | 'courses'
  | 'library' 
  | 'announcements' 
  | 'shop'
  | 'rewards' 
  | 'reviews' 
  | 'payment' 
  | 'profile' 
  | 'faq' 
  | 'contacts' 
  | 'appeals' 
  | 'complaints'
  | 'settings';

export type Theme = 'white' | 'onyx' | 'catppuccin' | 'custom';