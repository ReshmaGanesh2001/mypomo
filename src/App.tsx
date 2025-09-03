import React, { useState } from 'react';
import { Timer } from './components/Timer';
import { TaskList } from './components/TaskList';
import { AddTask } from './components/AddTask';
import { Settings } from './components/Settings';
import { Settings2, BarChart2 } from 'lucide-react';
import { playNotificationSound } from './utils/sound';
import type { Task, Settings as SettingsType, TimerMode } from './types';
import backGroundImage from '../public/digital-art-artwork-illustration-city-cityscape-night-2178069-wallhere.com.jpg'

const defaultSettings: SettingsType = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  alarmSound: 'bell',
  autoStartBreaks: true,
  autoStartPomodoros: true,
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [settings, setSettings] = useState<SettingsType>(defaultSettings);
  const [mode, setMode] = useState<TimerMode>('work');
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const handleAddTask = (title: string) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
        completed: false,
        completedPomodoros: 0,
      },
    ]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleTimerComplete = () => {
    playNotificationSound();

    if (mode === 'work') {
      setCompletedPomodoros((prev) => prev + 1);
      const shouldTakeLongBreak = completedPomodoros % settings.longBreakInterval === 0;
      setMode(shouldTakeLongBreak ? 'longBreak' : 'shortBreak');
      if (settings.autoStartBreaks) {
        setIsRunning(true);
      } else {
        setIsRunning(false);
      }
    } else {
      setMode('work');
      if (settings.autoStartPomodoros) {
        setIsRunning(true);
      } else {
        setIsRunning(false);
      }
    }
  };

  const getDuration = () => {
    switch (mode) {
      case 'work':
        return settings.workDuration;
      case 'shortBreak':
        return settings.shortBreakDuration;
      case 'longBreak':
        return settings.longBreakDuration;
    }
  };

  return (
    <div className="min-w-screen bg-black bg-[url('/digital-art-artwork-illustration-city-cityscape-night-2178069-wallhere.com.jpg')] bg-[length:100%_90%] bg-no-repeat">
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Pomodoro Timer</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <Settings2 className="w-6 h-6" />
            </button>
          </div>
        </header>

        <main className="space-y-8">
          <div className="relative bg-black bg-opacity-70 rounded-xl p-8 shadow-sm">
          {/* Timer stays centered */}
          <Timer
            mode={mode}
            duration={getDuration()}
            onComplete={handleTimerComplete}
            isRunning={isRunning}
            onToggle={() => setIsRunning(!isRunning)}
            onSkip={() => handleTimerComplete()}
          />

          {/* Spotify iframe in left corner */}
          <iframe
            className="absolute top-4 left-4 w-[250px] h-[150px] rounded-md"
            data-testid="embed-iframe"
            src="https://open.spotify.com/embed/playlist/6zCID88oNjNv9zx6puDHKj?utm_source=generator"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
          </iframe>
        </div>

          {showSettings ? (
            <div className="bg-black bg-opacity-70 rounded-xl p-8 shadow-sm">
              <Settings settings={settings} onUpdateSettings={setSettings} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-black bg-opacity-70 rounded-xl p-8 shadow-sm">
                <AddTask onAddTask={handleAddTask} />
              </div>
              <div className="bg-black bg-opacity-70 rounded-xl p-8 shadow-sm">
                <TaskList
                  tasks={tasks}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}