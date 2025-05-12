import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount!: number;

    @Column()
    category!: string;

    @Column()
    description!: string;

    @Column({ type: 'date' })
    date!: Date;

    @ManyToOne(() => User, user => user.expenses)
    user!: User;
}