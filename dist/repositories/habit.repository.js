"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitRepository = void 0;
const data_source_1 = require("../../src/dbConfig/data-source");
const Habit_1 = require("../entities/Habit");
class HabitRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(Habit_1.Habit);
    }
    // Basic CRUD operations
    create(habitData) {
        return __awaiter(this, void 0, void 0, function* () {
            const habit = this.repository.create(habitData);
            return this.repository.save(habit);
        });
    }
    save(habit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.save(habit);
        });
    }
    find(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find(options);
        });
    }
    findOne(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne(options);
        });
    }
    // Specific find methods
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({
                where: { id },
                relations: ['user']
            });
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: { user: { id: userId } },
                relations: ['user'],
                order: { createdAt: 'DESC' }
            });
        });
    }
    // Update operations - FIXED VERSION
    update(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(id, updateData);
            const updated = yield this.findById(id);
            if (!updated)
                throw new Error('Habit not found after update');
            return updated;
        });
    }
    updateByCriteria(criteria, // Changed from FindManyOptions
    updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.update(criteria, updateData);
        });
    }
    // Business logic methods
    markComplete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, {
                completed: true,
                lastCompletedAt: new Date()
            });
        });
    }
    resetDailyHabits(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateByCriteria({
                user: { id: userId }, // Simplified where clause
                frequency: 'daily'
            }, { completed: false });
        });
    }
    // Delete operation
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(id);
        });
    }
}
exports.HabitRepository = HabitRepository;
