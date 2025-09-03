import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, SkipForward } from 'lucide-react';
import { TimerMode } from '../types';

interface TimerProps {
  mode: TimerMode;
  duration: number;
  onComplete: () => void;
  isRunning: boolean;
  onToggle: () => void;
  onSkip: () => void;
}

export function Timer({ mode, duration, onComplete, isRunning, onToggle, onSkip }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration, mode]);

  useEffect(() => {
    let interval: number;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const getBackgroundColor = () => {
    switch (mode) {
      case 'work':
        return 'bg-red-500';
      case 'shortBreak':
        return 'bg-green-500';
      case 'longBreak':
        return 'bg-blue-500';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className={`rounded-full ${getBackgroundColor()} p-8 shadow-lg`}>
        <div className="text-6xl font-bold text-white">{formatTime(timeLeft)}</div>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={onToggle}
          className="flex items-center space-x-2 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>
        <button
          onClick={onSkip}
          className="flex items-center space-x-2 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <SkipForward className="w-5 h-5" />
          <span>Skip</span>
        </button>
      </div>
    </div>
  );
}