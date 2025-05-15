import { DailyTask } from '../entities/DailyTask';
import { DailyTaskRepository } from '../repositories/DailyTask.repository';

export class DailyTaskService {
  private dailyTaskRepo: DailyTaskRepository;

  constructor(dailyTaskRepo?: DailyTaskRepository) {
    this.dailyTaskRepo = dailyTaskRepo || new DailyTaskRepository();
  }

  async create(userId: string, data: Partial<DailyTask>) {
    const task = this.dailyTaskRepo.create({
      ...data,
      user: { id: userId } as any,
    });
    return await this.dailyTaskRepo.save(task);
  }

  async getAll(userId: string) {
    return await this.dailyTaskRepo.find({
      where: { user: { id: userId } },
    });
  }

  async getById(id: string) {
    return await this.dailyTaskRepo.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: string, data: Partial<DailyTask>) {
    // Assume updateTask returns the updated entity or null if not found
    return await this.dailyTaskRepo.updateTask(id, data);
  }

  async delete(id: string): Promise<boolean> {
    // deleteTask must return the DeleteResult object
    const result = await this.dailyTaskRepo.deleteTask(id);
    return result.affected !== 0;
  }

  async markAsComplete(id: string) {
    // Implement this if you want to support mark complete feature
    return await this.dailyTaskRepo.markAsComplete(id);
  }
}
