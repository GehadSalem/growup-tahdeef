"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const User_1 = require("../entities/User");
const Habit_1 = require("../entities/Habit");
const SavingsGoal_1 = require("../entities/SavingsGoal");
const Notification_1 = require("../entities/Notification");
const Installment_1 = require("../entities/Installment");
const Income_1 = require("../entities/Income");
const Expense_1 = require("../entities/Expense");
const EmergencyFund_1 = require("../entities/EmergencyFund");
const CustomInstallmentPlan_1 = require("../entities/CustomInstallmentPlan");
const DailyTask_1 = require("../entities/DailyTask");
const MajorGoal_1 = require("../entities/MajorGoal");
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [
        User_1.User,
        Habit_1.Habit,
        SavingsGoal_1.SavingsGoal,
        MajorGoal_1.MajorGoal,
        Notification_1.Notification,
        Installment_1.InstallmentPayment,
        Income_1.Income,
        Expense_1.Expense,
        EmergencyFund_1.EmergencyFund,
        CustomInstallmentPlan_1.CustomInstallmentPlan,
        DailyTask_1.DailyTask
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
