import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { randomBytes } from 'crypto';
import { Expense } from './Expense';
import { Habit } from './Habit';
import { EmergencyFund } from './EmergencyFund';
import { MajorGoal } from './MajorGoal';
import { DailyTask } from './DailyTask';
import { SavingsGoal } from './SavingsGoal';
import { Notification } from './Notification';
import { CustomInstallmentPlan } from './CustomInstallmentPlan';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  notificationToken?: string;

  @Column({ type: 'float', default: 0 })
  monthlyIncome!: number;

  @Column({ nullable: true })
  firebaseUid?: string;

  @Column({ default: 'email' })
  authProvider: 'email' | 'google';

    @Column({ nullable: false })
    referralCode!: string;

  @Column({ nullable: true })
  referredBy?: string;

    //جديد: هل المستخدم نشط؟ (مطلوب في لوحة التحكم)
  @Column({ default: true })
  isActive!: boolean;

  //جديد: تاريخ التسجيل (مطلوب للإحصائيات الشهرية)
  @CreateDateColumn()
  createdAt!: Date;

  //جديد: تاريخ آخر تعديل (اختياري)
  @UpdateDateColumn()
  updatedAt!: Date;
  
  @OneToMany(() => Expense, (expense) => expense.user)
  expenses!: Expense[];

  @OneToMany(() => Habit, (habit) => habit.user)
  habits!: Habit[];

  @OneToMany(() => MajorGoal, (majorGoal) => majorGoal.user)
  majorGoals!: MajorGoal[];

  @OneToMany(() => SavingsGoal, (savingsGoal) => savingsGoal.user)
  savingsGoals!: SavingsGoal[];

  @OneToMany(() => EmergencyFund, (emergency) => emergency.user)
  emergencyFunds!: EmergencyFund[];

  @OneToMany(() => DailyTask, (task) => task.user)
  dailyTasks!: DailyTask[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications!: Notification[];

  @OneToMany(() => CustomInstallmentPlan, (plan) => plan.user)
  installmentPlans!: CustomInstallmentPlan[];

  @BeforeInsert()
  generateReferralCode() {
    if (!this.referralCode) {
      this.referralCode = randomBytes(4).toString('hex');
    }
  }
}
