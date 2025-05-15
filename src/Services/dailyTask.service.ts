// src/Services/dailyTask.service.ts
import { AppDataSource } from '../dbConfig/data-source';
import { DailyTask } from '../entities/DailyTask';

export class DailyTaskService {
    markAsComplete(id: string) {
        throw new Error('Method not implemented.');
    }
    private dailyTaskRepo = AppDataSource.getRepository(DailyTask);

    async create(userId: string, data: Partial<DailyTask>) {
        const task = this.dailyTaskRepo.create({
            ...data,
            user: { id: userId },
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
        const task = await this.dailyTaskRepo.findOneBy({ id });
        if (!task) return null;
        this.dailyTaskRepo.merge(task, data);
        return await this.dailyTaskRepo.save(task);
    }

    async delete(id: string) {
        const result = await this.dailyTaskRepo.delete(id);
        return result.affected !== 0;
    }
}
