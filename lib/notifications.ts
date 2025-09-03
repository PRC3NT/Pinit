import { Task, User } from '@/types';

// Email notification service
export class NotificationService {
  private static async sendEmail(to: string, subject: string, body: string) {
    // In a production app, you would use a service like SendGrid, Nodemailer, or similar
    // For now, we'll simulate the email sending
    console.log('Email notification sent:', { to, subject, body });
    
    // You can integrate with actual email services here:
    /*
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, body })
    });
    */
  }

  static async notifyTaskCompleted(task: Task, assignedUser: User, assignerUser: User) {
    const timeToComplete = task.timeToComplete ? this.formatDuration(task.timeToComplete) : 'Unknown';
    
    const subject = `Task Completed: ${task.title}`;
    const body = `
      Hello ${assignerUser.name},

      Your assigned task has been completed!

      Task Details:
      - Title: ${task.title}
      - Description: ${task.description}
      - Assigned to: ${assignedUser.name}
      - Completed in: ${timeToComplete}
      - Completed at: ${task.completedAt?.toLocaleString()}

      You can view the task details in the Team Task Tracker application.

      Best regards,
      Team Task Tracker
    `;

    await this.sendEmail(assignerUser.email, subject, body);
  }

  static async notifyTaskAssigned(task: Task, assignedUser: User, assignerUser: User) {
    const subject = `New Task Assigned: ${task.title}`;
    const body = `
      Hello ${assignedUser.name},

      You have been assigned a new task!

      Task Details:
      - Title: ${task.title}
      - Description: ${task.description}
      - Assigned by: ${assignerUser.name}
      - Created at: ${task.createdAt?.toLocaleString()}

      Please log in to the Team Task Tracker to view and start working on this task.

      Best regards,
      Team Task Tracker
    `;

    await this.sendEmail(assignedUser.email, subject, body);
  }

  private static formatDuration(milliseconds: number): string {
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
  }
}

// Browser notification service
export class BrowserNotificationService {
  static async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  static async showNotification(title: string, options?: NotificationOptions) {
    const hasPermission = await this.requestPermission();
    
    if (hasPermission) {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });
    }
  }

  static notifyTaskCompleted(task: Task, timeToComplete: string) {
    this.showNotification(`Task Completed: ${task.title}`, {
      body: `Completed in ${timeToComplete}`,
      tag: `task-${task.id}`,
    });
  }

  static notifyNewTask(task: Task) {
    this.showNotification(`New Task Assigned: ${task.title}`, {
      body: task.description,
      tag: `task-${task.id}`,
    });
  }
}
