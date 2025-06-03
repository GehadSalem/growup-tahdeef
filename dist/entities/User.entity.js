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
var typeorm_1 = require("typeorm");
var crypto_1 = require("crypto");
var Expense_entity_1 = require("./Expense.entity.js");
var Habit_entity_1 = require("./Habit.entity.js");
var EmergencyFund_entity_1 = require("./EmergencyFund.entity.js");
var MajorGoal_entity_1 = require("./MajorGoal.entity.js");
var DailyTask_entity_1 = require("./DailyTask.entity.js");
var SavingsGoal_entity_1 = require("./SavingsGoal.entity.js");
var Notification_entity_1 = require("./Notification.entity.js");
var CustomInstallmentPlan_entity_1 = require("./CustomInstallmentPlan.entity.js");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.generateReferralCode = function () {
        if (!this.referralCode) {
            this.referralCode = (0, crypto_1.randomBytes)(4).toString('hex');
        }
    };
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
        (0, typeorm_1.OneToMany)(function () { return Expense_entity_1.Expense; }, function (expense) { return expense.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "expenses", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Habit_entity_1.Habit; }, function (habit) { return habit.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "habits", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return MajorGoal_entity_1.MajorGoal; }, function (majorGoal) { return majorGoal.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "majorGoals", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return SavingsGoal_entity_1.SavingsGoal; }, function (savingsGoal) { return savingsGoal.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "savingsGoals", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return EmergencyFund_entity_1.EmergencyFund; }, function (emergency) { return emergency.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "emergencyFunds", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return DailyTask_entity_1.DailyTask; }, function (task) { return task.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "dailyTasks", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Notification_entity_1.Notification; }, function (notification) { return notification.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "notifications", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return CustomInstallmentPlan_entity_1.CustomInstallmentPlan; }, function (plan) { return plan.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "installmentPlans", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], User.prototype, "generateReferralCode", null);
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.entity.js.map