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
var majorGoal_service_1 = require("../Services/majorGoal.service.js");
var users_service_1 = require("../Services/users.service.js");
require("../types/express");
var MajorGoalController = /** @class */ (function () {
    function MajorGoalController() {
    }
    var _a;
    _a = MajorGoalController;
    MajorGoalController.majorGoalService = new majorGoal_service_1.MajorGoalService();
    MajorGoalController.userService = new users_service_1.UserService();
    MajorGoalController.createMajorGoal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, newGoal, error_1, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information is missing in the request.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.userService.getUserById(req.user.id)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        res.status(404).json({ message: 'User not found.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.majorGoalService.createMajorGoal(user, req.body)];
                case 2:
                    newGoal = _b.sent();
                    res.status(201).json(newGoal);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    errorMessage = error_1 instanceof Error ? error_1.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    MajorGoalController.getUserMajorGoals = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var goals, error_2, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information is missing in the request.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.majorGoalService.getUserMajorGoals(req.user.id)];
                case 1:
                    goals = _b.sent();
                    res.json(goals);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    errorMessage = error_2 instanceof Error ? error_2.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    MajorGoalController.updateMajorGoal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var updatedGoal, error_3, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, this.majorGoalService.updateMajorGoal(req.params.id, req.body)];
                case 1:
                    updatedGoal = _b.sent();
                    res.json(updatedGoal);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _b.sent();
                    errorMessage = error_3 instanceof Error ? error_3.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    MajorGoalController.deleteMajorGoal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var error_4, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, this.majorGoalService.deleteMajorGoal(req.params.id)];
                case 1:
                    _b.sent();
                    res.status(204).send();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _b.sent();
                    errorMessage = error_4 instanceof Error ? error_4.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    MajorGoalController.updateProgress = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var progress, updatedGoal, error_5, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    progress = req.body.progress;
                    return [4 /*yield*/, this.majorGoalService.updateProgress(req.params.id, progress)];
                case 1:
                    updatedGoal = _b.sent();
                    res.json(updatedGoal);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _b.sent();
                    errorMessage = error_5 instanceof Error ? error_5.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    MajorGoalController.getMajorGoalById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var goalId, goal, error_6, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    goalId = req.params.id;
                    if (!req.user) {
                        res.status(400).json({ message: 'User information is missing in the request.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.MajorGoalService.getMajorGoalById(goalId)];
                case 1:
                    goal = _b.sent();
                    if (!goal) {
                        res.status(404).json({ message: 'Major goal not found.' });
                        return [2 /*return*/];
                    }
                    // Optional: ensure the goal belongs to the current user
                    if ((goal === null || goal === void 0 ? void 0 : goal.user.id) !== req.user.id) {
                        res.status(403).json({ message: 'Access denied to this goal.' });
                        return [2 /*return*/];
                    }
                    res.json(goal);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _b.sent();
                    errorMessage = error_6 instanceof Error ? error_6.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return MajorGoalController;
}());
exports.default = MajorGoalController;
//# sourceMappingURL=majorGoals.controller.js.map