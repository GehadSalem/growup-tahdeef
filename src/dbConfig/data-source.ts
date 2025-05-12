import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "../entities/User";
import { Habit } from "../entities/Habit";
import { SavingsGoal } from "../entities/SavingsGoal";
import { Notification } from "../entities/Notification";
import { Goal } from "../entities/Goal";
import { Installment } from "../entities/Installment";
import { Income } from "../entities/Income";
import { Expense } from "../entities/Expense";
import { EmergencyFund } from "../entities/EmergencyFund";
import { CustomInstallmentPlan } from "../entities/CustomInstallmentPlan";
import { DailyTask } from "../entities/DailyTask";

dotenv.config();


export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [
    User,
    Habit,
    SavingsGoal,
    Notification,
    Goal,
    Installment,
    Income,
    Expense,
    EmergencyFund,
    CustomInstallmentPlan,
    DailyTask
  ],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
  extra: {
    connectionLimit: 10,
    connectTimeout: 30000,
    acquireTimeout: 30000
  }
});
