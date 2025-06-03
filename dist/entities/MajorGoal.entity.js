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
exports.MajorGoal = void 0;
var typeorm_1 = require("typeorm");
var User_entity_1 = require("./User.entity");
var CustomInstallmentPlan_entity_1 = require("./CustomInstallmentPlan.entity");
var MajorGoal = /** @class */ (function () {
    function MajorGoal() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], MajorGoal.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_entity_1.User; }, function (user) { return user.majorGoals; }),
        __metadata("design:type", User_entity_1.User)
    ], MajorGoal.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], MajorGoal.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], MajorGoal.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'enum', enum: ['financial', 'personal', 'health', 'education'] }),
        __metadata("design:type", String)
    ], MajorGoal.prototype, "category", void 0);
    __decorate([
        (0, typeorm_1.Column)('decimal', { precision: 12, scale: 2 }),
        __metadata("design:type", Number)
    ], MajorGoal.prototype, "estimatedCost", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'date' }),
        __metadata("design:type", Date)
    ], MajorGoal.prototype, "targetDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: ['planned', 'in-progress', 'completed', 'postponed'],
            default: 'planned'
        }),
        __metadata("design:type", String)
    ], MajorGoal.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2, default: 0 }),
        __metadata("design:type", Number)
    ], MajorGoal.prototype, "progress", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return CustomInstallmentPlan_entity_1.CustomInstallmentPlan; }, function (installment) { return installment.linkedGoal; }),
        __metadata("design:type", Array)
    ], MajorGoal.prototype, "linkedInstallments", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], MajorGoal.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], MajorGoal.prototype, "updatedAt", void 0);
    MajorGoal = __decorate([
        (0, typeorm_1.Entity)()
    ], MajorGoal);
    return MajorGoal;
}());
exports.MajorGoal = MajorGoal;
//# sourceMappingURL=MajorGoal.entity.js.map