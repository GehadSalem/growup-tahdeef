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
exports.Expense = void 0;
var typeorm_1 = require("typeorm");
var User_entity_1 = require("./User.entity.js");
var Expense = /** @class */ (function () {
    function Expense() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], Expense.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
        __metadata("design:type", Number)
    ], Expense.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Expense.prototype, "category", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Expense.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'date' }),
        __metadata("design:type", Date)
    ], Expense.prototype, "date", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_entity_1.User; }, function (user) { return user.expenses; }),
        __metadata("design:type", User_entity_1.User)
    ], Expense.prototype, "user", void 0);
    Expense = __decorate([
        (0, typeorm_1.Entity)()
    ], Expense);
    return Expense;
}());
exports.Expense = Expense;
//# sourceMappingURL=Expense.entity.js.map