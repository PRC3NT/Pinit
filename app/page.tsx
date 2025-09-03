'use client';

import { useState } from 'react';
import { Bell, LogOut, Plus } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Pinit</h1>
          <p className="text-gray-600 mb-8">
            Your collaborative task management app is being set up!
          </p>
          <div className="space-y-4">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ Project deployed successfully
            </div>
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              🔧 Setting up database and authentication
            </div>
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
              📱 Coming soon: Full task management features
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-8">
            This is a free, collaborative task tracker built with Next.js, Supabase, and Cloudinary.
          </p>
        </div>
      </div>
    </div>
  );
}
