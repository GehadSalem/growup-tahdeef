"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDailyTaskScheduler = void 0;
/**
 * وظيفة لجدولة المهام اليومية
 * @param tasks قائمة بالمهام اليومية
 * @param notifyCallback دالة الاستدعاء للإشعارات
 */
const createDailyTaskScheduler = (tasks, notifyCallback) => {
    // جدولة كل مهمة بناءً على وقت التذكير
    tasks.forEach(task => {
        const now = new Date();
        const reminderTime = new Date(task.reminderTime);
        if (reminderTime > now) {
            const delay = reminderTime.getTime() - now.getTime();
            setTimeout(() => {
                var _a;
                notifyCallback(task);
                // إذا كانت المهمة متكررة، نعيد جدولتها لليوم التالي
                if (task.isRecurring && ((_a = task.frequency) === null || _a === void 0 ? void 0 : _a.interval) === 'daily') {
                    const nextDay = new Date(reminderTime);
                    nextDay.setDate(nextDay.getDate() + 1);
                    task.reminderTime = nextDay.toISOString();
                    (0, exports.createDailyTaskScheduler)([task], notifyCallback);
                }
            }, delay);
        }
    });
};
exports.createDailyTaskScheduler = createDailyTaskScheduler;
