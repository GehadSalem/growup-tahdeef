import { Installment } from '../entities/Installment';
import { User } from '../entities/User';
import { InstallmentRepository } from '../repositories/installment.repository';

export class InstallmentService {
  private repository: InstallmentRepository;

  constructor() {
    this.repository = new InstallmentRepository();
  }

  async createInstallment(installment: Installment): Promise<Installment> {
    return this.repository.create(installment);
  }

  async getUserInstallments(user: User): Promise<Installment[]> {
    return this.repository.findByUser(user);
  }

  async getInstallmentById(id: string, user: User): Promise<Installment | null> {
    return this.repository.findById(id, user);
  }

  async updateInstallment(
    id: string,
    updateData: Partial<Installment>,
    user: User
  ): Promise<Installment | null> {
    return this.repository.update(id, updateData, user);
  }

  async deleteInstallment(id: string, user: User): Promise<boolean> {
    return this.repository.delete(id, user);
  }

  async getInstallmentsByDateRange(
    user: User,
    startDate: Date,
    endDate: Date
  ): Promise<Installment[]> {
    return this.repository.findByDateRange(user, startDate, endDate);
  }

  async getInstallmentsByStatus(user: User, status: string): Promise<Installment[]> {
    return this.repository.findByStatus(user, status);
  }

  async markInstallmentPaid(id: string, user: User): Promise<Installment | null> {
    return this.repository.markAsPaid(id, user);
  }
}