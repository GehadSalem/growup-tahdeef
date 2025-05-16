import { Repository, Between } from 'typeorm';
import { AppDataSource } from '../dbConfig/data-source';
import { Installment } from '../entities/Installment';
import { User } from '../entities/User';

export class InstallmentRepository {
  private repository: Repository<Installment>;

  constructor() {
    this.repository = AppDataSource.getRepository(Installment);
  }

  async create(installment: Installment): Promise<Installment> {
    return this.repository.save(installment);
  }

  async findByUser(user: User): Promise<Installment[]> {
    return this.repository.find({ where: { user } });
  }

  async findById(id: string, user: User): Promise<Installment | null> {
    return this.repository.findOne({ where: { id, user } });
  }

  async update(id: string, updateData: Partial<Installment>, user: User): Promise<Installment | null> {
    await this.repository.update({ id, user }, updateData);
    return this.findById(id, user);
  }

  async delete(id: string, user: User): Promise<boolean> {
    const result = await this.repository.delete({ id, user });
    return result.affected !== 0;
  }

  async findByDateRange(user: User, startDate: Date, endDate: Date): Promise<Installment[]> {
    return this.repository.find({
      where: {
        user,
        paymentDate: Between(startDate, endDate)
      }
    });
  }

  async findByStatus(user: User, status: string): Promise<Installment[]> {
    return this.repository.find({ where: { user, status } });
  }

  async markAsPaid(id: string, user: User): Promise<Installment | null> {
    await this.repository.update(
      { id, user },
      { status: 'paid', paymentDate: new Date() }
    );
    return this.findById(id, user);
  }
}