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
exports.InstallmentPayment = void 0;
const typeorm_1 = require("typeorm");
const CustomInstallmentPlan_1 = require("./CustomInstallmentPlan");
let InstallmentPayment = class InstallmentPayment {
};
exports.InstallmentPayment = InstallmentPayment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], InstallmentPayment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CustomInstallmentPlan_1.CustomInstallmentPlan, plan => plan.payments),
    __metadata("design:type", CustomInstallmentPlan_1.CustomInstallmentPlan)
], InstallmentPayment.prototype, "installmentPlan", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], InstallmentPayment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], InstallmentPayment.prototype, "paymentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['pending', 'paid', 'late', 'missed'],
        default: 'pending'
    }),
    __metadata("design:type", String)
], InstallmentPayment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['credit_card', 'bank_transfer', 'cash', 'other'],
        default: 'bank_transfer'
    }),
    __metadata("design:type", String)
], InstallmentPayment.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], InstallmentPayment.prototype, "isOnTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], InstallmentPayment.prototype, "notes", void 0);
exports.InstallmentPayment = InstallmentPayment = __decorate([
    (0, typeorm_1.Entity)()
], InstallmentPayment);
