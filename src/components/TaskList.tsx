import React from 'react';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <button onClick={() => onToggleTask(task.id)}>
              {task.completed ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400" />
              )}
            </button>
            <span className={task.completed ? 'line-through text-gray-400' : ''}>
              {task.title}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}