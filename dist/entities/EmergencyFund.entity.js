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
exports.EmergencyFund = void 0;
var typeorm_1 = require("typeorm");
var User_entity_1 = require("./User.entity");
var EmergencyFund = /** @class */ (function () {
    function EmergencyFund() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], EmergencyFund.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }) // Better for monetary values
        ,
        __metadata("design:type", Number)
    ], EmergencyFund.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'date' }),
        __metadata("design:type", Date)
    ], EmergencyFund.prototype, "date", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], EmergencyFund.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_entity_1.User; }, function (user) { return user.emergencyFunds; }),
        __metadata("design:type", User_entity_1.User)
    ], EmergencyFund.prototype, "user", void 0);
    EmergencyFund = __decorate([
        (0, typeorm_1.Entity)()
    ], EmergencyFund);
    return EmergencyFund;
}());
exports.EmergencyFund = EmergencyFund;
//# sourceMappingURL=EmergencyFund.entity.js.map