"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.HabitService = void 0;
var habit_repository_1 = require("../repositories/habit.repository.js");
var user_repository_1 = require("../repositories/user.repository.js");
var HabitService = /** @class */ (function () {
    function HabitService() {
        this.habitRepository = new habit_repository_1.HabitRepository();
        this.userRepository = new user_repository_1.UserRepository();
    }
    HabitService.prototype.createHabit = function (userId, habitData) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findById(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('المستخدم غير موجود');
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.habitRepository.create(__assign(__assign({}, habitData), { user: user, completed: false, createdAt: new Date() }))];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error creating habit:', error_1);
                        throw new Error('حدث خطأ أثناء حفظ العادة');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    HabitService.prototype.getUserHabits = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.habitRepository.findByUserId(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Error fetching habits:', error_2);
                        throw new Error('حدث خطأ أثناء استرجاع العادات');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HabitService.prototype.markHabitComplete = function (habitId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var habit, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.habitRepository.findOne({
                                where: { id: habitId, user: { id: userId } }
                            })];
                    case 1:
                        habit = _a.sent();
                        if (!habit) {
                            throw new Error('العادة غير موجودة');
                        }
                        if (habit.completed) {
                            throw new Error('العادة مكتملة بالفعل');
                        }
                        return [4 /*yield*/, this.habitRepository.markComplete(habitId)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_3 = _a.sent();
                        console.error('Error completing habit:', error_3);
                        throw error_3 instanceof Error ? error_3 : new Error('حدث خطأ أثناء تحديث العادة');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HabitService.prototype.resetDailyHabits = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.habitRepository.resetDailyHabits(userId)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.error('Error resetting habits:', error_4);
                        throw new Error('حدث خطأ أثناء إعادة تعيين العادات اليومية');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HabitService.prototype.deleteHabit = function (habitId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var habit, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.habitRepository.findOne({
                                where: { id: habitId, user: { id: userId } }
                            })];
                    case 1:
                        habit = _a.sent();
                        if (!habit) {
                            throw new Error('العادة غير موجودة');
                        }
                        return [4 /*yield*/, this.habitRepository.delete(habitId)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        console.error('Error deleting habit:', error_5);
                        throw new Error('حدث خطأ أثناء حذف العادة');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return HabitService;
}());
exports.HabitService = HabitService;
//# sourceMappingURL=habit.service.js.map