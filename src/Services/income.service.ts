import { Between } from 'typeorm';
import { AppDataSource } from '../dbConfig/data-source';
import { Income } from '../entities/Income.entity';

class IncomeService {
  private incomeRepository = AppDataSource.getRepository(Income);

  async createIncome(incomeData: Partial<Income>, userId: string) {
    const newIncome = this.incomeRepository.create({
      ...incomeData,
      user: { id: userId }
    });
    return await this.incomeRepository.save(newIncome);
  }

  async getUserIncomes(userId: string) {
    return await this.incomeRepository.find({
      where: { user: { id: userId } }
    });
  }

  async updateIncome(incomeId: string, userId: string, updateData: Partial<Income>) {
    const income = await this.incomeRepository.findOne({
      where: { id: incomeId, user: { id: userId } }
    });

    if (!income) return null;

    Object.assign(income, updateData);
    return await this.incomeRepository.save(income);
  }

  async deleteIncome(incomeId: string, userId: string) {
    const result = await this.incomeRepository.delete({
      id: incomeId,
      user: { id: userId }
    });
    return result.affected !== 0;
  }

  async getIncomeById(incomeId: string, userId: string) {
    return await this.incomeRepository.findOne({
      where: { id: incomeId, user: { id: userId } }
    });
  }

  async getIncomesByDateRange(userId: string, year: number, month?: number) {
    const startDate = month !== undefined
      ? new Date(year, month - 1, 1)
      : new Date(year, 0, 1);

    const endDate = month !== undefined
      ? new Date(year, month, 0, 23, 59, 59)
      : new Date(year, 11, 31, 23, 59, 59);

    return await this.incomeRepository.find({
      where: {
        user: { id: userId },
        date: Between(startDate, endDate)
      },
      order: { date: 'DESC' }
    });
  }
}

export default IncomeService;