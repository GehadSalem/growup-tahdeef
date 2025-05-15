import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class SavingsGoal {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, user => user.savingsGoals)
  user!: User;

  @Column()
  goalName!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { precision: 12, scale: 2 })
  targetAmount!: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  currentAmount!: number;

  @Column({ type: 'date' })
  targetDate!: Date;

  @Column({ default: 'active' })
  status!: 'active' | 'completed' | 'paused';

  @Column({ default: false })
  isEmergencyFund!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}