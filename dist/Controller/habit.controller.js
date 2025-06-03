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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var habit_service_1 = require("../Services/habit.service.js");
var notification_service_1 = require("../Services/notification.service.js");
require("../types/express.js");
var HabitController = /** @class */ (function () {
    function HabitController() {
    }
    var _a;
    _a = HabitController;
    HabitController.habitService = new habit_service_1.HabitService();
    HabitController.notificationService = new notification_service_1.NotificationService();
    HabitController.addHabit = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var habit, error_1, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!request.user) {
                        response.status(401).json({ message: 'Unauthorized' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.habitService.createHabit(request.user.id, request.body)];
                case 1:
                    habit = _b.sent();
                    response.status(201).json(habit);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    errorMessage = error_1 instanceof Error ? error_1.message : 'An unknown error occurred';
                    response.status(400).json({ message: errorMessage });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    HabitController.getHabits = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var habits, error_2, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!request.user) {
                        response.status(401).json({ message: 'Unauthorized' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.habitService.getUserHabits(request.user.id)];
                case 1:
                    habits = _b.sent();
                    response.json(habits);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    errorMessage = error_2 instanceof Error ? error_2.message : 'An unknown error occurred';
                    response.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    HabitController.markHabitComplete = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var habitId, habit, error_3, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if (!request.user) {
                        response.status(401).json({ message: 'Unauthorized' });
                        return [2 /*return*/];
                    }
                    habitId = request.params.id;
                    if (!habitId) {
                        response.status(400).json({ message: 'Invalid habit ID' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.habitService.markHabitComplete(habitId, request.user.id)];
                case 1:
                    habit = _b.sent();
                    return [4 /*yield*/, this.notificationService.sendNotification(request.user, "أحسنت!", "\u0644\u0642\u062F \u0623\u0643\u0645\u0644\u062A \u0639\u0627\u062F\u0629 ".concat(habit.name, " \u0628\u0646\u062C\u0627\u062D!"))];
                case 2:
                    _b.sent();
                    response.json(habit);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    errorMessage = error_3 instanceof Error ? error_3.message : 'An unknown error occurred';
                    response.status(400).json({ message: errorMessage });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return HabitController;
}());
exports.default = HabitController;
//# sourceMappingURL=habit.controller.js.map