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
exports.DailyTask = exports.TaskStatus = exports.HabitType = void 0;
var typeorm_1 = require("typeorm");
var User_entity_1 = require("./User.entity.js");
var HabitType;
(function (HabitType) {
    HabitType["READING"] = "READING";
    HabitType["EXERCISE"] = "EXERCISE";
    HabitType["MEDITATION"] = "MEDITATION";
    HabitType["FINANCIAL"] = "FINANCIAL";
    HabitType["OTHER"] = "OTHER";
})(HabitType || (exports.HabitType = HabitType = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["PENDING"] = "PENDING";
    TaskStatus["COMPLETED"] = "COMPLETED";
    TaskStatus["SKIPPED"] = "SKIPPED";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
var DailyTask = /** @class */ (function () {
    function DailyTask() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], DailyTask.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], DailyTask.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], DailyTask.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_entity_1.User; }, function (user) { return user.dailyTasks; }),
        __metadata("design:type", User_entity_1.User)
    ], DailyTask.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: HabitType,
            default: HabitType.OTHER
        }),
        __metadata("design:type", String)
    ], DailyTask.prototype, "habitType", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], DailyTask.prototype, "isRecurring", void 0);
    __decorate([
        (0, typeorm_1.Column)('json', { nullable: true }),
        __metadata("design:type", Object)
    ], DailyTask.prototype, "frequency", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'time' }),
        __metadata("design:type", String)
    ], DailyTask.prototype, "reminderTime", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: TaskStatus,
            default: TaskStatus.PENDING
        }),
        __metadata("design:type", String)
    ], DailyTask.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], DailyTask.prototype, "isCompleted", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", Number)
    ], DailyTask.prototype, "streak", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'date' }),
        __metadata("design:type", Date)
    ], DailyTask.prototype, "dueDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], DailyTask.prototype, "currentAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
        __metadata("design:type", Number)
    ], DailyTask.prototype, "targetAmount", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], DailyTask.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], DailyTask.prototype, "updatedAt", void 0);
    DailyTask = __decorate([
        (0, typeorm_1.Entity)()
    ], DailyTask);
    return DailyTask;
}());
exports.DailyTask = DailyTask;
//# sourceMappingURL=DailyTask.entity.js.map