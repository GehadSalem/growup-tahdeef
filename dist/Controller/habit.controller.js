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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const habit_service_1 = require("../Services/habit.service");
const notification_service_1 = require("../Services/notification.service");
require("../types/express");
class HabitController {
}
_a = HabitController;
HabitController.habitService = new habit_service_1.HabitService();
HabitController.notificationService = new notification_service_1.NotificationService();
HabitController.addHabit = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.user) {
            response.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const habit = yield _a.habitService.createHabit(request.user.id, request.body);
        response.status(201).json(habit);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        response.status(400).json({ message: errorMessage });
    }
});
HabitController.getHabits = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.user) {
            response.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const habits = yield _a.habitService.getUserHabits(request.user.id);
        response.json(habits);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        response.status(500).json({ message: errorMessage });
    }
});
HabitController.markHabitComplete = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.user) {
            response.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const habitId = request.params.id;
        if (!habitId) {
            response.status(400).json({ message: 'Invalid habit ID' });
            return;
        }
        const habit = yield _a.habitService.markHabitComplete(habitId, request.user.id);
        yield _a.notificationService.sendNotification(request.user, "أحسنت!", `لقد أكملت عادة ${habit.name} بنجاح!`);
        response.json(habit);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        response.status(400).json({ message: errorMessage });
    }
});
exports.default = HabitController;
