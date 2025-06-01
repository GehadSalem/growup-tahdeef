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
exports.HabitService = void 0;
const habit_repository_1 = require("../repositories/habit.repository");
const user_repository_1 = require("../repositories/user.repository");
class HabitService {
    constructor() {
        this.habitRepository = new habit_repository_1.HabitRepository();
        this.userRepository = new user_repository_1.UserRepository();
    }
    createHabit(userId, habitData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(userId);
            if (!user) {
                throw new Error('المستخدم غير موجود');
            }
            try {
                return yield this.habitRepository.create(Object.assign(Object.assign({}, habitData), { user, completed: false, createdAt: new Date() }));
            }
            catch (error) {
                console.error('Error creating habit:', error);
                throw new Error('حدث خطأ أثناء حفظ العادة');
            }
        });
    }
    getUserHabits(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.habitRepository.findByUserId(userId);
            }
            catch (error) {
                console.error('Error fetching habits:', error);
                throw new Error('حدث خطأ أثناء استرجاع العادات');
            }
        });
    }
    markHabitComplete(habitId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const habit = yield this.habitRepository.findOne({
                    where: { id: habitId, user: { id: userId } }
                });
                if (!habit) {
                    throw new Error('العادة غير موجودة');
                }
                if (habit.completed) {
                    throw new Error('العادة مكتملة بالفعل');
                }
                return yield this.habitRepository.markComplete(habitId);
            }
            catch (error) {
                console.error('Error completing habit:', error);
                throw error instanceof Error ? error : new Error('حدث خطأ أثناء تحديث العادة');
            }
        });
    }
    resetDailyHabits(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.habitRepository.resetDailyHabits(userId);
            }
            catch (error) {
                console.error('Error resetting habits:', error);
                throw new Error('حدث خطأ أثناء إعادة تعيين العادات اليومية');
            }
        });
    }
    deleteHabit(habitId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const habit = yield this.habitRepository.findOne({
                    where: { id: habitId, user: { id: userId } }
                });
                if (!habit) {
                    throw new Error('العادة غير موجودة');
                }
                yield this.habitRepository.delete(habitId);
            }
            catch (error) {
                console.error('Error deleting habit:', error);
                throw new Error('حدث خطأ أثناء حذف العادة');
            }
        });
    }
}
exports.HabitService = HabitService;
