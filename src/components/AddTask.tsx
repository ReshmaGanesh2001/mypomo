import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddTaskProps {
  onAddTask: (title: string) => void;
}

export function AddTask({ onAddTask }: AddTaskProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What are you working on?"
          className="flex-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>Add Task</span>
      </button>
    </form>
  );
}