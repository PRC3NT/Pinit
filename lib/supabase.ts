import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Task {
  id: string;
  title: string;
  description: string;
  assignee_id: string;
  assignee_email: string;
  assignee_name: string;
  creator_id: string;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
  started_at?: string;
  completed_at?: string;
  attachment_url?: string;
  attachment_name?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}
