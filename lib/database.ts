import { supabase, Task, User } from './supabase';

export const database = {
  // Task operations
  tasks: {
    // Create new task
    create: async (task: Omit<Task, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          ...task,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    // Get all tasks
    getAll: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },

    // Get tasks for specific user
    getForUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('assignee_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },

    // Update task
    update: async (id: string, updates: Partial<Task>) => {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    // Delete task
    delete: async (id: string) => {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },

    // Subscribe to real-time changes
    subscribe: (callback: (tasks: Task[]) => void) => {
      return supabase
        .channel('tasks')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'tasks' }, 
          async () => {
            // Fetch updated tasks
            const { data } = await supabase
              .from('tasks')
              .select('*')
              .order('created_at', { ascending: false });
            
            callback(data || []);
          }
        )
        .subscribe();
    }
  },

  // User operations
  users: {
    // Get user by ID
    getById: async (id: string) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },

    // Get all users (for team member selection)
    getAll: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('name');

      if (error) throw error;
      return data || [];
    },

    // Update user profile
    update: async (id: string, updates: Partial<User>) => {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }
};
