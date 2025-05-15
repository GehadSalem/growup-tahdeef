import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { SavingsGoal } from "./SavingsGoal";

@Entity()
export class MajorGoal {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, user => user.majorGoals)
  user!: User;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'enum', enum: ['financial', 'personal', 'health', 'education'] })
  category!: string;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  estimatedCost?: number;

  @Column({ type: 'date' })
  targetDate!: Date;

  @Column({ default: 'planned' })
  status!: 'planned' | 'in-progress' | 'completed' | 'postponed';

  @Column({ default: 0 })
  progress!: number;

  @OneToMany(() => SavingsGoal, savingsGoal => savingsGoal.majorGoal)
  savingsGoals!: SavingsGoal[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}