# Pinit - 100% Free Task Management

A collaborative task management application built with Next.js, Supabase, and Cloudinary - completely free to use!

## Features

- **Task Assignment**: Assign tasks with attachments to team members
- **Real-time Timer**: Automatic time tracking when tasks are started
- **Notifications**: Get notified when tasks are completed with completion time
- **File Attachments**: Upload and share files with tasks (via Cloudinary)
- **Real-time Updates**: Live status updates across all team members
- **User Authentication**: Secure login and user management

## Tech Stack (100% Free)

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Database**: Supabase (Free PostgreSQL database + auth)
- **File Storage**: Cloudinary (Free 10GB storage)
- **Icons**: Lucide React
- **Notifications**: Browser notifications + Email alerts

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Free Supabase account
- Free Cloudinary account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase and Cloudinary configuration values

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Free Setup Guide

### 1. Supabase Setup (Free Database + Auth)
1. Go to https://supabase.com/ and create free account
2. Create new project
3. Go to Settings → API to get your URL and anon key
4. Run the SQL commands provided in `setup.sql` to create tables

### 2. Cloudinary Setup (Free File Storage)
1. Go to https://cloudinary.com/ and create free account
2. Get your cloud name, API key, and API secret from dashboard
3. Create unsigned upload preset named "task_tracker"

### 3. Environment Variables
Update `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=task_tracker
```

## Usage

1. **Sign Up/Login**: Create an account or login with existing credentials
2. **Create Tasks**: Click "New Task" to assign tasks to team members
3. **Track Progress**: Team members can start and complete tasks
4. **Monitor Time**: See how long tasks take to complete
5. **File Sharing**: Attach files to tasks for better collaboration

## Team Members

Update the team members list in `components/CreateTask.tsx`:

```typescript
const teamMembers = [
  { id: 'user1', email: 'colleague1@company.com', name: 'John Smith' },
  { id: 'user2', email: 'colleague2@company.com', name: 'Sarah Johnson' },
  // Add your actual team members
];
```

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Icons**: Lucide React

## Project Structure

```
task-tracker-team/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CreateTask.tsx
│   ├── Login.tsx
│   └── TaskList.tsx
├── lib/
│   └── firebase.ts
├── types/
│   └── index.ts
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
