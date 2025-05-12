import { Repository } from 'typeorm';
import { AppDataSource } from '../../src/dbConfig/data-source';
import { User } from '../entities/User';

export class UserRepository {
    findOne(arg0: { where: { id: number; }; }) {
        throw new Error('Method not implemented.');
    }
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return this.repository.findOne({ where: { id } });
    }

    async create(userData: Partial<User>): Promise<User> {
        const user = this.repository.create(userData);
        return this.repository.save(user);
    }

    async update(id: number, updateData: Partial<User>): Promise<User> {
        await this.repository.update(id, updateData);
        return this.findById(id) as Promise<User>;
    }

    async updateMonthlyIncome(id: number, income: number): Promise<User> {
        return this.update(id, { monthlyIncome: income });
    }

    async updateNotificationToken(id: number, token: string): Promise<User> {
        return this.update(id, { notificationToken: token });
    }
}