'use client';

import { useState, useEffect } from 'react';
import { Clock, CheckCircle, Play, Paperclip, User as UserIcon, Plus, LogOut, Bell } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  status: 'pending' | 'in_progress' | 'completed';
  attachments?: any[];
  timeToComplete?: number;
}

export default function DemoPage() {
  const [user, setUser] = useState<User>({
    id: 'demo-user',
    email: 'demo@company.com',
    name: 'Demo User'
  });
  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review Marketing Proposal',
      description: 'Please review the Q4 marketing proposal and provide feedback',
      assignedTo: 'demo-user',
      assignedBy: 'manager-1',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'pending',
      attachments: [{ name: 'marketing-proposal.pdf', size: 2048000 }]
    },
    {
      id: '2',
      title: 'Update Database Schema',
      description: 'Add new fields for user preferences tracking',
      assignedTo: 'demo-user',
      assignedBy: 'tech-lead',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      startedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      status: 'in_progress'
    },
    {
      id: '3',
      title: 'Client Presentation Slides',
      description: 'Create slides for tomorrow\'s client meeting',
      assignedTo: 'demo-user',
      assignedBy: 'sales-manager',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      startedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      completedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      status: 'completed',
      timeToComplete: 2.5 * 60 * 60 * 1000 // 2.5 hours
    }
  ]);

  const [showCreateTask, setShowCreateTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', assignedTo: '' });

  const formatDuration = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const handleStartTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'in_progress' as const, startedAt: new Date() }
        : task
    ));
    
    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Task Started', {
        body: 'Timer is now running for your task!',
        icon: '/favicon.ico'
      });
    }
  };

  const handleCompleteTask = (taskId: string, startedAt: Date) => {
    const completedAt = new Date();
    const timeToComplete = completedAt.getTime() - startedAt.getTime();
    
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: 'completed' as const, 
            completedAt,
            timeToComplete 
          }
        : task
    ));

    // Show completion notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Task Completed!', {
        body: `Completed in ${formatDuration(timeToComplete)}`,
        icon: '/favicon.ico'
      });
    }
  };

  const handleCreateTask = () => {
    if (!newTask.title.trim() || !newTask.assignedTo) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      assignedTo: newTask.assignedTo,
      assignedBy: user.id,
      createdAt: new Date(),
      status: 'pending'
    };

    setTasks(prev => [task, ...prev]);
    setNewTask({ title: '', description: '', assignedTo: '' });
    setShowCreateTask(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'in_progress': return <Play className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const teamMembers = [
    { id: 'user1', name: 'John Smith', email: 'john@company.com' },
    { id: 'user2', name: 'Sarah Johnson', email: 'sarah@company.com' },
    { id: 'user3', name: 'Mike Wilson', email: 'mike@company.com' },
    { id: 'user4', name: 'Lisa Brown', email: 'lisa@company.com' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Team Task Tracker</h1>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                DEMO MODE
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={() => setShowCreateTask(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <h3 className="text-sm font-medium text-blue-800">🎉 Demo Mode Active</h3>
            <p className="mt-1 text-sm text-blue-700">
              This is a fully functional demo of your Task Tracker app. Try starting tasks, completing them, and creating new ones!
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Your Tasks</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <li key={task.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {getStatusIcon(task.status)}
                            <span className="ml-1 capitalize">{task.status.replace('_', ' ')}</span>
                          </span>
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {task.title}
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                          <span>Created: {task.createdAt.toLocaleDateString()}</span>
                          {task.startedAt && (
                            <span>Started: {task.startedAt.toLocaleDateString()}</span>
                          )}
                          {task.completedAt && task.timeToComplete && (
                            <span className="text-green-600 font-medium">
                              Completed in: {formatDuration(task.timeToComplete)}
                            </span>
                          )}
                          {task.attachments && task.attachments.length > 0 && (
                            <span className="flex items-center">
                              <Paperclip className="h-4 w-4 mr-1" />
                              {task.attachments.length} attachment{task.attachments.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {task.status === 'pending' && (
                          <button
                            onClick={() => handleStartTask(task.id)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Start
                          </button>
                        )}
                        {task.status === 'in_progress' && task.startedAt && (
                          <button
                            onClick={() => handleCompleteTask(task.id, task.startedAt!)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {showCreateTask && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Create New Task</h3>
              <button
                onClick={() => setShowCreateTask(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter task description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Assign To</label>
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask(prev => ({ ...prev, assignedTo: e.target.value }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a team member</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateTask(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTask}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
