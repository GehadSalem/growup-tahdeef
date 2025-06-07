"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodaysTasks = void 0;
/**
 * @param tasks قائمة بالمهام
 * @returns المهام التي يجب جدولتها اليوم
 */
var getTodaysTasks = function (tasks) {
    var today = new Date().getDay();
    var currentDate = new Date().getDate();
    return tasks.filter(function (task) {
        var _a, _b;
        if (!task.isRecurring)
            return true;
        // التحقق من وجود frequency قبل استخدامها
        if (!task.frequency)
            return false;
        switch (task.frequency.interval) {
            case 'daily':
                return true;
            case 'weekly':
                return (_b = (_a = task.frequency.daysOfWeek) === null || _a === void 0 ? void 0 : _a.includes(today)) !== null && _b !== void 0 ? _b : false;
            case 'monthly':
                return task.frequency.dayOfMonth === currentDate;
            default:
                return false;
        }
    });
};
exports.getTodaysTasks = getTodaysTasks;
//# sourceMappingURL=helpers.js.map