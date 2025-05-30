"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodaysTasks = void 0;
/**
 * @param tasks قائمة بالمهام
 * @returns المهام التي يجب جدولتها اليوم
 */
const getTodaysTasks = (tasks) => {
    const today = new Date().getDay();
    return tasks.filter(task => {
        var _a, _b;
        if (!task.isRecurring)
            return true;
        if (!task.frequency)
            return false;
        const frequency = task.frequency; // ✅ هيساعد TypeScript يتأكد إنه موجود
        switch (frequency.interval) {
            case 'daily':
                return true;
            case 'weekly':
                return (_b = (_a = frequency.daysOfWeek) === null || _a === void 0 ? void 0 : _a.includes(today)) !== null && _b !== void 0 ? _b : false;
            case 'monthly':
                const currentDay = new Date().getDate();
                return frequency.dayOfMonth === currentDay;
            default:
                return false;
        }
    });
};
exports.getTodaysTasks = getTodaysTasks;
