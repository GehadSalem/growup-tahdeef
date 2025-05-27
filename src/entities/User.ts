import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Expense } from './Expense';
import { Habit } from './Habit';
import { EmergencyFund } from './EmergencyFund';
import { MajorGoal } from './MajorGoal';
import { DailyTask } from './DailyTask';
import { SavingsGoal } from './SavingsGoal'; // Make sure this import path is correct
import { Notification } from './Notification';

@Entity()
export class User {
    [x: string]: any;
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ nullable: true })
    notificationToken!: string;

    @Column({ type: 'float', default: 0 })
    monthlyIncome!: number;

    @OneToMany(() => Expense, (expense) => expense.user)
    expenses!: Expense[];
  
    @OneToMany(() => Habit, (habit) => habit.user)
    habits!: Habit[];

    @OneToMany(() => MajorGoal, (majorGoal) => majorGoal.user)
    majorGoals!: MajorGoal[];

    @OneToMany(() => SavingsGoal, (savingsGoal) => savingsGoal.user) // Fixed parameter name
    savingsGoals!: SavingsGoal[];

    @OneToMany(() => EmergencyFund, (emergency) => emergency.user)
    emergencyFunds!: EmergencyFund[];

    @OneToMany(() => DailyTask, (task) => task.user)
    dailyTasks!: DailyTask[];

    @OneToMany(() => Notification, notification => notification.user)
    notifications: Notification[];
    @Column({ nullable: true })
    firebaseUid?: string; // For Firebase users

    @Column({ default: 'email' })
    authProvider: 'email' | 'google'; // Add other providers as needed

}