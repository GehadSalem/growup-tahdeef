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
exports.SavingsGoal = void 0;
var typeorm_1 = require("typeorm");
var User_entity_1 = require("./User.entity.js");
var SavingsGoal = /** @class */ (function () {
    function SavingsGoal() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], SavingsGoal.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_entity_1.User; }, function (user) { return user.id; }),
        __metadata("design:type", User_entity_1.User)
    ], SavingsGoal.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], SavingsGoal.prototype, "goalName", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], SavingsGoal.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], SavingsGoal.prototype, "targetAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], SavingsGoal.prototype, "currentAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'date' }),
        __metadata("design:type", Date)
    ], SavingsGoal.prototype, "targetDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 'active' }),
        __metadata("design:type", String)
    ], SavingsGoal.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], SavingsGoal.prototype, "isEmergencyFund", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], SavingsGoal.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], SavingsGoal.prototype, "updatedAt", void 0);
    SavingsGoal = __decorate([
        (0, typeorm_1.Entity)()
    ], SavingsGoal);
    return SavingsGoal;
}());
exports.SavingsGoal = SavingsGoal;
//# sourceMappingURL=SavingsGoal.entity.js.map