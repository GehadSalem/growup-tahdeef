import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn
} from 'typeorm';
import { User } from './User';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  status: 'pending' | 'completed' | 'failed';

  @CreateDateColumn()
  createdAt: Date;
}
