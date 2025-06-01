import { DailyTask } from '../entities/DailyTask.entity';

/**
 * @param tasks قائمة بالمهام
 * @returns المهام التي يجب جدولتها اليوم
 */
export const getTodaysTasks = (tasks: DailyTask[]): DailyTask[] => {
  const today = new Date().getDay(); 
  
  return tasks.filter(task => {
    if (!task.isRecurring) return true;
    if (!task.frequency) return false;

    const frequency = task.frequency; // ✅ هيساعد TypeScript يتأكد إنه موجود

    switch (frequency.interval) {
      case 'daily':
        return true;
      case 'weekly':
        return frequency.daysOfWeek?.includes(today) ?? false;
      case 'monthly':
        const currentDay = new Date().getDate();
        return frequency.dayOfMonth === currentDay;
      default:
        return false;
    }
  });
};
