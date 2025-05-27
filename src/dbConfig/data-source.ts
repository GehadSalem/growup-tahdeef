import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "../entities/User";
import { Habit } from "../entities/Habit";
import { SavingsGoal } from "../entities/SavingsGoal";
import { Notification } from "../entities/Notification";
import { InstallmentPayment } from "../entities/Installment";
import { Income } from "../entities/Income";
import { Expense } from "../entities/Expense";
import { EmergencyFund } from "../entities/EmergencyFund";
import { CustomInstallmentPlan } from "../entities/CustomInstallmentPlan";
import { DailyTask } from "../entities/DailyTask";
import { MajorGoal } from "../entities/MajorGoal";

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
    MajorGoal,
    Notification,
    InstallmentPayment,
    Income,
    Expense,
    EmergencyFund,
    CustomInstallmentPlan,
    DailyTask
  ],
  migrations: [],
  subscribers: [],
  extra: {
    ssl: {
      rejectUnauthorized: false
    },
    // socketPath: "/var/run/mysqld/mysqld.sock" // For Hostinger
  },
  connectTimeout: 30000 // Increase timeout
});
