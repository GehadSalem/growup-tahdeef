import { AppDataSource } from "../dbConfig/data-source";
import { MajorGoal } from "../entities/MajorGoal";
import { User } from "../entities/User";

export class MajorGoalService {
  
  private majorGoalRepository = AppDataSource.getRepository(MajorGoal);

  async createMajorGoal(user: User, goalData: Partial<MajorGoal>): Promise<MajorGoal> {
    const newGoal = this.majorGoalRepository.create({
      ...goalData,
      user
    });
    return await this.majorGoalRepository.save(newGoal);
  }

  async getUserMajorGoals(userId: string): Promise<MajorGoal[]> {
    return await this.majorGoalRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'savingsGoals']
    });
  }

  async updateMajorGoal(goalId: string, updateData: Partial<MajorGoal>): Promise<MajorGoal> {
    const goal = await this.majorGoalRepository.findOneBy({ id: goalId });
    if (!goal) throw new Error('Major goal not found');
    
    Object.assign(goal, updateData);
    return await this.majorGoalRepository.save(goal);
  }

  async deleteMajorGoal(goalId: string): Promise<void> {
    await this.majorGoalRepository.delete(goalId);
  }

  async updateProgress(goalId: string, progress: number): Promise<MajorGoal> {
    const goal = await this.majorGoalRepository.findOneBy({ id: goalId });
    if (!goal) throw new Error('Major goal not found');
    
    goal.progress = progress;
    if (progress >= 100) {
      goal.status = 'completed';
    } else if (progress > 0) {
      goal.status = 'in-progress';
    }
    
    return await this.majorGoalRepository.save(goal);
  }
  async getMajorGoalById(goalId: string): Promise<MajorGoal | null> {
  return await this.majorGoalRepository.findOne({
    where: { id: goalId },
    relations: ['user', 'savingsGoals'], // include related entities if needed
  });
}

}