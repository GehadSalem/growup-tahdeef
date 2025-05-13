import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
@Entity()
export class SavingsGoal {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => User, user => user.id)
  user!: User;

  @Column()
  goalName!: string;

  @Column()
  targetAmount!: number;

  @Column()
  availableAmount!: number;

  @Column()
  status!: string;
}
