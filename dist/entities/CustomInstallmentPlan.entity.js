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
exports.CustomInstallmentPlan = void 0;
var typeorm_1 = require("typeorm");
var User_entity_1 = require("./User.entity.js");
var MajorGoal_entity_1 = require("./MajorGoal.entity.js");
var Installment_entity_1 = require("./Installment.entity.js");
var CustomInstallmentPlan = /** @class */ (function () {
    function CustomInstallmentPlan() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], CustomInstallmentPlan.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_entity_1.User; }, function (user) { return user.installmentPlans; }),
        __metadata("design:type", User_entity_1.User)
    ], CustomInstallmentPlan.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], CustomInstallmentPlan.prototype, "productName", void 0);
    __decorate([
        (0, typeorm_1.Column)('decimal', { precision: 12, scale: 2 }),
        __metadata("design:type", Number)
    ], CustomInstallmentPlan.prototype, "totalCost", void 0);
    __decorate([
        (0, typeorm_1.Column)('decimal', { precision: 12, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], CustomInstallmentPlan.prototype, "downPayment", void 0);
    __decorate([
        (0, typeorm_1.Column)('int'),
        __metadata("design:type", Number)
    ], CustomInstallmentPlan.prototype, "monthsCount", void 0);
    __decorate([
        (0, typeorm_1.Column)('decimal', { precision: 12, scale: 2 }),
        __metadata("design:type", Number)
    ], CustomInstallmentPlan.prototype, "monthlyInstallment", void 0);
    __decorate([
        (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], CustomInstallmentPlan.prototype, "interestRate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'date' }),
        __metadata("design:type", Date)
    ], CustomInstallmentPlan.prototype, "startDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'date', nullable: true }),
        __metadata("design:type", Object)
    ], CustomInstallmentPlan.prototype, "endDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: ['active', 'completed', 'paused', 'cancelled'],
            default: 'active'
        }),
        __metadata("design:type", String)
    ], CustomInstallmentPlan.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return MajorGoal_entity_1.MajorGoal; }, function (goal) { return goal.linkedInstallments; }, {
            nullable: true,
            eager: true // Optional: automatically loads the relation
        }),
        __metadata("design:type", MajorGoal_entity_1.MajorGoal)
    ], CustomInstallmentPlan.prototype, "linkedGoal", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Installment_entity_1.InstallmentPayment; }, function (payment) { return payment.installmentPlan; }),
        __metadata("design:type", Array)
    ], CustomInstallmentPlan.prototype, "payments", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true }),
        __metadata("design:type", Object)
    ], CustomInstallmentPlan.prototype, "notes", void 0);
    CustomInstallmentPlan = __decorate([
        (0, typeorm_1.Entity)()
    ], CustomInstallmentPlan);
    return CustomInstallmentPlan;
}());
exports.CustomInstallmentPlan = CustomInstallmentPlan;
//# sourceMappingURL=CustomInstallmentPlan.entity.js.map