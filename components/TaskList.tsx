'use client';

import { useState } from 'react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Task, User } from '@/types';
import { BrowserNotificationService } from '@/lib/notifications';
import { Clock, CheckCircle, Play, Paperclip, User as UserIcon } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  currentUser: User;
}

export default function TaskList({ tasks, currentUser }: TaskListProps) {
  const [updatingTask, setUpdatingTask] = useState<string | null>(null);

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

  const handleStartTask = async (taskId: string) => {
    setUpdatingTask(taskId);
    try {
      await updateDoc(doc(db, 'tasks', taskId), {
        status: 'in_progress',
        startedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error starting task:', error);
    } finally {
      setUpdatingTask(null);
    }
  };

  const handleCompleteTask = async (taskId: string, startedAt: Date) => {
    setUpdatingTask(taskId);
    try {
      const completedAt = new Date();
      const timeToComplete = completedAt.getTime() - startedAt.getTime();
      
      await updateDoc(doc(db, 'tasks', taskId), {
        status: 'completed',
        completedAt: serverTimestamp(),
        timeToComplete
      });

      // Show browser notification
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        BrowserNotificationService.notifyTaskCompleted(task, formatDuration(timeToComplete));
      }
    } catch (error) {
      console.error('Error completing task:', error);
    } finally {
      setUpdatingTask(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in_progress':
        return <Play className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks assigned</h3>
        <p className="mt-1 text-sm text-gray-500">
          You don't have any tasks assigned to you yet.
        </p>
      </div>
    );
  }

  return (
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
                    <span>Created: {task.createdAt?.toLocaleDateString()}</span>
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
                      disabled={updatingTask === task.id}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </button>
                  )}
                  {task.status === 'in_progress' && task.startedAt && (
                    <button
                      onClick={() => handleCompleteTask(task.id, task.startedAt!)}
                      disabled={updatingTask === task.id}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
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
  );
}
