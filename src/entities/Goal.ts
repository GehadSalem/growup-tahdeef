import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from './User';
  
  @Entity({ name: 'goals' })
  export class Goal {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    name!: string;
  
    @Column()
    targetAmount!: number;
  
    @Column()
    currentAmount!: number;
  
    @Column({ type: 'date' })
    targetDate!: Date;
  
    @Column({ type: 'boolean', default: false })
    achieved!: boolean;
  
    @Column({ type: 'timestamp', nullable: true })
    achievedAt!: Date | null;
  
    @ManyToOne(() => User, (user) => user.goals, {
      onDelete: 'CASCADE',
      eager: false,
    })
    @JoinColumn({ name: 'user_id' })
    user!: User;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
  }
  