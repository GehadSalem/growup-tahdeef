import { AppDataSource } from "../dbConfig/data-source";
import { SavingsGoal } from "../entities/SavingsGoal";
import { User } from "../entities/User";

export class SavingsGoalService {
  private savingsGoalRepository = AppDataSource.getRepository(SavingsGoal);

  async createSavingsGoal(user: User, goalData: Partial<SavingsGoal>): Promise<SavingsGoal> {
    const newGoal = this.savingsGoalRepository.create({
      ...goalData,
      user
    });
    return await this.savingsGoalRepository.save(newGoal);
  }

  async getUserSavingsGoals(userId: string): Promise<SavingsGoal[]> {
    return await this.savingsGoalRepository.find({
      where: { user: { id: userId } },
      relations: ['user']
    });
  }

  async updateSavingsGoal(goalId: string, updateData: Partial<SavingsGoal>): Promise<SavingsGoal> {
    const goal = await this.savingsGoalRepository.findOneBy({ id: goalId });
    if (!goal) throw new Error('Savings goal not found');
    
    Object.assign(goal, updateData);
    return await this.savingsGoalRepository.save(goal);
  }

  async deleteSavingsGoal(goalId: string): Promise<void> {
    await this.savingsGoalRepository.delete(goalId);
  }

  async addToSavingsGoal(goalId: string, amount: number): Promise<SavingsGoal> {
    const goal = await this.savingsGoalRepository.findOneBy({ id: goalId });
    if (!goal) throw new Error('Savings goal not found');
    
    goal.currentAmount += amount;
    if (goal.currentAmount >= goal.targetAmount) {
      goal.status = 'completed';
    }
    
    return await this.savingsGoalRepository.save(goal);
  }
}