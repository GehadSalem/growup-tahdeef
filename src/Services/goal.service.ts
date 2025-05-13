import { Goal } from '../entities/Goal';
import { User } from '../entities/User';
import { GoalRepository } from '../repositories/goal.repository';
import { UserRepository } from '../repositories/user.repository';

export class GoalService {
    private goalRepository = new GoalRepository();
    private userRepository = new UserRepository();

    async createGoal(userId: string, goalData: Omit<Partial<Goal>, 'currentAmount' | 'achieved' | 'achievedAt' | 'user'>): Promise<Goal> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('المستخدم غير موجود');
        }

        const goal = await this.goalRepository.create({
            ...goalData,
            currentAmount: 0,
            achieved: false,
            achievedAt: null,
            user
        });

        return this.goalRepository.save(goal);
    }

    async getUserGoals(userId: string): Promise<Goal[]> {
        return this.goalRepository.findByUserId(userId);
    }

    async contributeToGoal(goalId: string, userId: string, amount: number): Promise<Goal> {
        if (amount <= 0) {
            throw new Error('المبلغ يجب أن يكون موجبًا');
        }

        const goal = await this.goalRepository.findOne({
            where: { id: goalId, user: { id: userId } }
        });

        if (!goal) {
            throw new Error('الهدف غير موجود');
        }

        if (goal.achieved) {
            throw new Error('الهدف محقق بالفعل');
        }

        const updatedGoal = await this.goalRepository.contribute(goalId, amount);
        return updatedGoal;
    }

    async calculateMonthlySavings(userId: string): Promise<number> {
        const goals = await this.getUserGoals(userId);
        const activeGoals = goals.filter(g => !g.achieved);
        
        return activeGoals.reduce((total: number, goal: Goal) => {
            const monthsLeft = this.getMonthsDifference(new Date(), goal.targetDate);
            const remainingAmount = goal.targetAmount - goal.currentAmount;
            return total + (remainingAmount / Math.max(1, monthsLeft));
        }, 0);
    }

    async getUpcomingGoals(userId: string, limit = 3): Promise<Goal[]> {
        return (await this.getUserGoals(userId))
            .filter(g => !g.achieved)
            .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime())
            .slice(0, limit);
    }

    private getMonthsDifference(date1: Date, date2: Date): number {
        const yearDiff = date2.getFullYear() - date1.getFullYear();
        const monthDiff = date2.getMonth() - date1.getMonth();
        return Math.max(0, (yearDiff * 12) + monthDiff);
    }
}