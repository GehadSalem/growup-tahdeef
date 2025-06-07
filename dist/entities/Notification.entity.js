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
exports.Notification = exports.NotificationStatus = exports.NotificationType = void 0;
var typeorm_1 = require("typeorm");
var User_entity_1 = require("./User.entity");
var NotificationType;
(function (NotificationType) {
    NotificationType["DAILY_HABIT"] = "DAILY_HABIT";
    NotificationType["BUDGET_EXCEEDED"] = "BUDGET_EXCEEDED";
    NotificationType["PAYMENT_REMINDER"] = "PAYMENT_REMINDER";
    NotificationType["SAVING_GOAL"] = "SAVING_GOAL";
    NotificationType["GENERAL"] = "GENERAL";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["SCHEDULED"] = "SCHEDULED";
    NotificationStatus["SENT"] = "SENT";
    NotificationStatus["READ"] = "READ";
    NotificationStatus["FAILED"] = "FAILED";
})(NotificationStatus || (exports.NotificationStatus = NotificationStatus = {}));
var Notification = /** @class */ (function () {
    function Notification() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], Notification.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_entity_1.User; }, function (user) { return user.notifications; }),
        __metadata("design:type", User_entity_1.User)
    ], Notification.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: NotificationType,
            default: NotificationType.GENERAL
        }),
        __metadata("design:type", String)
    ], Notification.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Notification.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Notification.prototype, "message", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp' }),
        __metadata("design:type", Date)
    ], Notification.prototype, "scheduledTime", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: NotificationStatus,
            default: NotificationStatus.SCHEDULED
        }),
        __metadata("design:type", String)
    ], Notification.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'boolean', default: false }),
        __metadata("design:type", Boolean)
    ], Notification.prototype, "isRead", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
        __metadata("design:type", String)
    ], Notification.prototype, "relatedEntityId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp', default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Date)
    ], Notification.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp', default: function () { return "CURRENT_TIMESTAMP"; }, onUpdate: "CURRENT_TIMESTAMP" }),
        __metadata("design:type", Date)
    ], Notification.prototype, "updatedAt", void 0);
    Notification = __decorate([
        (0, typeorm_1.Entity)()
    ], Notification);
    return Notification;
}());
exports.Notification = Notification;
//# sourceMappingURL=Notification.entity.js.map