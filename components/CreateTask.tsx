interface CreateTaskProps {
  onClose: () => void;
}

export default function CreateTask({ onClose }: CreateTaskProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create Task</h2>
        <p className="text-gray-600 mb-4">
          Task creation will be available after database setup is complete.
        </p>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
