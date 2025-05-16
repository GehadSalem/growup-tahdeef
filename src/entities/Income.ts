import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
@Entity()
export class Income {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, user => user.id)
  user!: User;

  @Column()
  amount!: number;
  
  @Column()
  description!: string;

  @Column({ type: 'date' })
  date!: Date;
}
