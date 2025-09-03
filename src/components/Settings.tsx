import React from 'react';
import { Settings as SettingsType } from '../types';

interface SettingsProps {
  settings: SettingsType;
  onUpdateSettings: (settings: SettingsType) => void;
}

export function Settings({ settings, onUpdateSettings }: SettingsProps) {
  const handleChange = (key: keyof SettingsType, value: any) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg text-white font-semibold">Timer Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white">Work Duration (minutes)</label>
            <input
              type="number"
              value={settings.workDuration}
              onChange={(e) => handleChange('workDuration', parseInt(e.target.value))}
              className="mt-1 w-full p-2 rounded-md border border-gray-200"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm text-white">Short Break (minutes)</label>
            <input
              type="number"
              value={settings.shortBreakDuration}
              onChange={(e) => handleChange('shortBreakDuration', parseInt(e.target.value))}
              className="mt-1 w-full p-2 rounded-md border border-gray-200"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm text-white">Long Break (minutes)</label>
            <input
              type="number"
              value={settings.longBreakDuration}
              onChange={(e) => handleChange('longBreakDuration', parseInt(e.target.value))}
              className="mt-1 w-full p-2 rounded-md border border-gray-200"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm text-white">Long Break Interval</label>
            <input
              type="number"
              value={settings.longBreakInterval}
              onChange={(e) => handleChange('longBreakInterval', parseInt(e.target.value))}
              className="mt-1 w-full p-2 rounded-md border border-gray-200"
              min="1"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg text-white font-semibold">Automation</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.autoStartBreaks}
              onChange={(e) => handleChange('autoStartBreaks', e.target.checked)}
              className="rounded text-red-500"
            />
            <span className='text-white'>Auto-start Breaks</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.autoStartPomodoros}
              onChange={(e) => handleChange('autoStartPomodoros', e.target.checked)}
              className="rounded text-red-500"
            />
            <span className='text-white'>Auto-start Pomodoros</span>
          </label>
        </div>
      </div>
    </div>
  );
}