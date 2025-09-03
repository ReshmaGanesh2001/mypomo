export interface Task {
  id: string;
  title: string;
  completed: boolean;
  completedPomodoros: number;
}

export interface Settings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  alarmSound: string;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}

export type TimerMode = 'work' | 'shortBreak' | 'longBreak';