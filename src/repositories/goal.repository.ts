import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { AppDataSource } from '../../src/dbConfig/data-source';
import { Goal } from '../entities/Goal';

export class GoalRepository {
    private repository: Repository<Goal>;

    constructor() {
        this.repository = AppDataSource.getRepository(Goal);
    }

    // Basic CRUD operations
    async create(goalData: Partial<Goal>): Promise<Goal> {
        const goal = this.repository.create(goalData);
        return this.repository.save(goal);
    }

    async save(goal: Goal): Promise<Goal> {
        return this.repository.save(goal);
    }

    async findById(id: string): Promise<Goal | null> {
        return this.repository.findOne({ 
            where: { id },
            relations: ['user']
        });
    }

    async findOne(options: FindOneOptions<Goal>): Promise<Goal | null> {
        return this.repository.findOne(options);
    }

    async findByUserId(userId: string): Promise<Goal[]> {
        return this.repository.find({ 
            where: { user: { id: userId } },
            relations: ['user'],
            order: { targetDate: 'ASC' }
        });
    }

    async find(options?: FindManyOptions<Goal>): Promise<Goal[]> {
        return this.repository.find(options);
    }

    async update(id: string, updateData: Partial<Goal>): Promise<Goal> {
        await this.repository.update(id, updateData);
        const updatedGoal = await this.findById(id);
        if (!updatedGoal) {
            throw new Error('Goal not found after update');
        }
        return updatedGoal;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    // Custom business logic methods
    async contribute(id: string, amount: number): Promise<Goal> {
        const goal = await this.findById(id);
        if (!goal) throw new Error('الهدف غير موجود');

        const newAmount = goal.currentAmount + amount;
        const achieved = newAmount >= goal.targetAmount;

        return this.update(id, { 
            currentAmount: newAmount,
            achieved,
            achievedAt: achieved ? new Date() : undefined
        });
    }

    // Additional utility methods
    async countUserGoals(userId: string): Promise<number> {
        return this.repository.count({
            where: { user: { id: userId } }
        });
    }

    async getAchievedGoals(userId: string): Promise<Goal[]> {
        return this.repository.find({
            where: { 
                user: { id: userId },
                achieved: true
            },
            order: { achievedAt: 'DESC' }
        });
    }

    async getActiveGoals(userId: string): Promise<Goal[]> {
        return this.repository.find({
            where: { 
                user: { id: userId },
                achieved: false
            },
            order: { targetDate: 'ASC' }
        });
    }
}