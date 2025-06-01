"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const crypto_1 = require("crypto");
const Expense_1 = require("./Expense");
const Habit_1 = require("./Habit");
const EmergencyFund_1 = require("./EmergencyFund");
const MajorGoal_1 = require("./MajorGoal");
const DailyTask_1 = require("./DailyTask");
const SavingsGoal_1 = require("./SavingsGoal");
const Notification_1 = require("./Notification");
const CustomInstallmentPlan_1 = require("./CustomInstallmentPlan");
let User = class User {
    generateReferralCode() {
        if (!this.referralCode) {
            this.referralCode = (0, crypto_1.randomBytes)(4).toString('hex');
        }
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "notificationToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "monthlyIncome", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firebaseUid", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'email' }),
    __metadata("design:type", String)
], User.prototype, "authProvider", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "referralCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "referredBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Expense_1.Expense, (expense) => expense.user),
    __metadata("design:type", Array)
], User.prototype, "expenses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Habit_1.Habit, (habit) => habit.user),
    __metadata("design:type", Array)
], User.prototype, "habits", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MajorGoal_1.MajorGoal, (majorGoal) => majorGoal.user),
    __metadata("design:type", Array)
], User.prototype, "majorGoals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SavingsGoal_1.SavingsGoal, (savingsGoal) => savingsGoal.user),
    __metadata("design:type", Array)
], User.prototype, "savingsGoals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EmergencyFund_1.EmergencyFund, (emergency) => emergency.user),
    __metadata("design:type", Array)
], User.prototype, "emergencyFunds", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DailyTask_1.DailyTask, (task) => task.user),
    __metadata("design:type", Array)
], User.prototype, "dailyTasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Notification_1.Notification, (notification) => notification.user),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CustomInstallmentPlan_1.CustomInstallmentPlan, (plan) => plan.user),
    __metadata("design:type", Array)
], User.prototype, "installmentPlans", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "generateReferralCode", null);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
