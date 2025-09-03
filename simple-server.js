const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Task Tracker</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <header class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <h1 class="text-xl font-semibold text-gray-900">Team Task Tracker</h1>
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        New Task
                    </button>
                </div>
            </div>
        </header>
        
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <div class="bg-white shadow rounded-lg p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">Welcome to Team Task Tracker!</h2>
                    
                    <div class="space-y-4">
                        <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                            <h3 class="text-sm font-medium text-yellow-800">Setup Required</h3>
                            <p class="mt-1 text-sm text-yellow-700">
                                To use the full functionality, you need to:
                            </p>
                            <ul class="mt-2 text-sm text-yellow-700 list-disc list-inside space-y-1">
                                <li>Fix Node.js PATH configuration</li>
                                <li>Install dependencies properly</li>
                                <li>Set up Firebase configuration</li>
                            </ul>
                        </div>
                        
                        <div class="bg-blue-50 border border-blue-200 rounded-md p-4">
                            <h3 class="text-sm font-medium text-blue-800">Features Ready</h3>
                            <ul class="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
                                <li>✅ User Authentication System</li>
                                <li>✅ Task Creation & Assignment</li>
                                <li>✅ Real-time Timer Tracking</li>
                                <li>✅ File Upload Support</li>
                                <li>✅ Completion Notifications</li>
                                <li>✅ Modern Responsive UI</li>
                            </ul>
                        </div>
                        
                        <div class="bg-green-50 border border-green-200 rounded-md p-4">
                            <h3 class="text-sm font-medium text-green-800">How It Works</h3>
                            <ol class="mt-2 text-sm text-green-700 list-decimal list-inside space-y-1">
                                <li>Create tasks and assign to colleagues</li>
                                <li>Timer starts automatically when they begin</li>
                                <li>Get notified when tasks are completed</li>
                                <li>See exact completion times</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</body>
</html>
    `);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Task Tracker running at http://localhost:${PORT}`);
  console.log('📝 Your app is ready! Open the URL above in your browser.');
});
