import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class MajorGoal {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, user => user.id)
  user!: User;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'enum', enum: ['financial', 'personal', 'health', 'education'] })
  category!: string;

  @Column()
  estimatedCost!: number;

  @Column({ type: 'date' })
  targetDate!: Date;

  @Column({ default: 'planned' })
  status!: 'planned' | 'in-progress' | 'completed' | 'postponed';

  @Column({ default: 0 })
  progress!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}