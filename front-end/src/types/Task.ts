export interface Task {
    id?: string;
    description?: string;
    numberOfPomodoros?: number;
    pomodoroTime?: boolean | number;
    pomodoroBreak?: boolean | number;
    isStarted?: boolean;
    isFinished?: boolean;
    timeSpent?: string;
}
  