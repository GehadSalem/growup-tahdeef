import { AppDataSource } from '../dbConfig/data-source';
import { DailyTask } from '../entities/DailyTask';

export const DailyTaskRepository = AppDataSource.getRepository(DailyTask);

/**
 * Find all tasks by a specific user ID
 */
export const findTasksByUserId = async (userId: string) => {
  return await DailyTaskRepository.find({
    where: { user: { id: userId } },
    relations: ['user'],
    order: { createdAt: 'DESC' }
  });
};

/**
 * Mark a task as complete
 */
export const markTaskAsComplete = async (taskId: string) => {
  const task = await DailyTaskRepository.findOneBy({ id: taskId });
  if (!task) throw new Error('Task not found');
  task.isCompleted = true;
  task.streak += 1;
  return await DailyTaskRepository.save(task);
};

/**
 * Create a new task
 */
export const createTask = async (data: Partial<DailyTask>) => {
  const task = DailyTaskRepository.create(data);
  return await DailyTaskRepository.save(task);
};

/**
 * Update a task
 */
export const updateTask = async (taskId: string, updates: Partial<DailyTask>) => {
  const task = await DailyTaskRepository.findOneBy({ id: taskId });
  if (!task) throw new Error('Task not found');
  DailyTaskRepository.merge(task, updates);
  return await DailyTaskRepository.save(task);
};

/**
 * Delete a task
 */
export const deleteTask = async (taskId: string) => {
  return await DailyTaskRepository.delete(taskId);
};

/**
 * Get task by ID
 */
export const getTaskById = async (taskId: string) => {
  return await DailyTaskRepository.findOne({
    where: { id: taskId },
    relations: ['user']
  });
};
