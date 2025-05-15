import { AppDataSource } from "../dbConfig/data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SavingsGoal } from "../entities/SavingsGoal";
import { DailyTask } from "../entities/DailyTask";

export class UserService {
    getUserById(id: string) {
        throw new Error('Method not implemented.');
    }
    private userRepository = AppDataSource.getRepository(User);

    async register(userData: {
        email: string;
        password: string;
        name: string;
        monthlyIncome: number;
    }): Promise<{ user: User; token: string }> {
        const existingUser = await this.userRepository.findOne({ 
            where: { email: userData.email } 
        });
        if (existingUser) throw new Error('البريد الإلكتروني مسجل بالفعل');

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const emergencyFundTarget = userData.monthlyIncome * 0.7;

        const newUser = this.userRepository.create({
            ...userData,
            password: hashedPassword,
            savingsGoals: [{
                goalName: "صندوق الطوارئ",
                targetAmount: emergencyFundTarget,
                currentAmount: 0,
                isEmergencyFund: true,
                status: "active"
            } as unknown as SavingsGoal]
        });

        await this.userRepository.save(newUser);

        const token = this.generateToken(newUser.id);

        return { user: newUser, token };
    }

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) throw new Error('المستخدم غير موجود');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('كلمة المرور غير صحيحة');

        const token = this.generateToken(user.id);
        return { user, token };
    }

    async updateMonthlyIncome(userId: string, newIncome: number): Promise<User> {
        const user = await this.userRepository.findOne({ 
            where: { id: userId },
            relations: ['savingsGoals']
        });
        if (!user) throw new Error('المستخدم غير موجود');

        const emergencyFund = user.savingsGoals.find(g => g.isEmergencyFund);
        if (emergencyFund) {
            emergencyFund.targetAmount = newIncome * 0.7;
            await AppDataSource.getRepository(SavingsGoal).save(emergencyFund);
        }

        user.monthlyIncome = newIncome;
        return await this.userRepository.save(user);
    }

    async getFinancialOverview(userId: string): Promise<{
        monthlyIncome: number;
        emergencyFund: {
            target: number;
            saved: number;
            progress: number;
        };
        activeGoals: number;
    }> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['savingsGoals']
        });
        if (!user) throw new Error('المستخدم غير موجود');

        const emergencyFund = user.savingsGoals.find(g => g.isEmergencyFund);
        
        return {
            monthlyIncome: user.monthlyIncome,
            emergencyFund: {
                target: emergencyFund?.targetAmount || 0,
                saved: emergencyFund?.currentAmount || 0,
                progress: emergencyFund ? 
                    (emergencyFund.currentAmount / emergencyFund.targetAmount) * 100 : 0
            },
            activeGoals: user.savingsGoals.filter(g => !g.isEmergencyFund && g.status === 'active').length
        };
    }

    // async setupDefaultHabits(userId: string): Promise<DailyTask[]> {
    //     const defaultHabits = [
    //         {
    //             name: "قراءة كتاب",
    //             title: "اقرأ 10 صفحات يومياً",
    //             habitType: "تعليم",
    //             isRecurring: true,
    //             frequency: { interval: "daily" as "daily" },
    //             reminderTime: new Date().setHours(20, 0, 0, 0),
    //             isCompleted: false,
    //             streak: 0
    //         },
    //         {
    //             name: "ممارسة الرياضة",
    //             title: "30 دقيقة رياضة يومياً",
    //             habitType: "صحة",
    //             isRecurring: true,
    //             frequency: { interval: "daily" },
    //             reminderTime: new Date().setHours(7, 0, 0, 0),
    //             isCompleted: false,
    //             streak: 0
    //         }
    //     ];

    //     const dailyTaskRepo = AppDataSource.getRepository(DailyTask);
    //     const tasks = defaultHabits.map(habit => 
    //          dailyTaskRepo.create({ ...habit, user: { id: userId } as Partial<User> })
    //     );

    //     return await dailyTaskRepo.save(tasks);
    // }

    private generateToken(userId: string): string {
        return jwt.sign(
            { id: userId },
            process.env.JWT_SECRET || "your-strong-secret",
            { expiresIn: "30d" }
        );
    }
}