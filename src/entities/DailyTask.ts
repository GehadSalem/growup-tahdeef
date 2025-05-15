import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity()
export class DailyTask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => User, user => user.dailyTasks)
  user!: User;

  @Column()
  title!: string;

  @Column()
  habitType!: string;

  @Column()
  isRecurring!: boolean;

  @Column('json')
  frequency!: {
    interval: 'daily' | 'weekly' | 'monthly';
    daysOfWeek?: number[];
    dayOfMonth?: number;
  };

  @Column()
  reminderTime!: Date;

  @Column()
  isCompleted!: boolean;

  @Column()
  streak!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
