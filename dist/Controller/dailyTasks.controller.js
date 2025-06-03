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
require("../types/express");
var dailyTask_service_1 = require("../Services/dailyTask.service");
var DailyTaskController = /** @class */ (function () {
    function DailyTaskController() {
    }
    var _a;
    _a = DailyTaskController;
    DailyTaskController.taskService = new dailyTask_service_1.DailyTaskService();
    DailyTaskController.createTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var task, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!req.user) {
                        res.status(401).json({ message: 'Unauthorized' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.taskService.create(req.user.id, req.body)];
                case 1:
                    task = _b.sent();
                    res.status(201).json(task);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    if (error_1 instanceof Error) {
                        res.status(400).json({ message: error_1.message });
                    }
                    else {
                        res.status(400).json({ message: 'An unknown error occurred' });
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    DailyTaskController.getTasks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var tasks, error_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!req.user) {
                        res.status(401).json({ message: 'Unauthorized' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.taskService.getAll(req.user.id)];
                case 1:
                    tasks = _b.sent();
                    res.json(tasks);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    if (error_2 instanceof Error) {
                        res.status(500).json({ message: error_2.message });
                    }
                    else {
                        res.status(500).json({ message: 'An unknown error occurred' });
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    DailyTaskController.getTaskById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var task, error_3;
        var _b;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, _a.taskService.getById((_b = req.params) === null || _b === void 0 ? void 0 : _b.id)];
                case 1:
                    task = _c.sent();
                    if (!task) { // <-- Error points here if getById returns void
                        res.status(404).json({ message: 'Task not found' });
                        return [2 /*return*/];
                    }
                    res.json(task);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _c.sent();
                    res.status(500).json({ message: error_3.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    DailyTaskController.updateTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var updated, error_4;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, this.taskService.update(req.params.id, req.body)];
                case 1:
                    updated = _b.sent();
                    if (!updated) {
                        res.status(404).json({ message: 'Task not found' });
                        return [2 /*return*/];
                    }
                    res.json(updated);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _b.sent();
                    if (error_4 instanceof Error) {
                        res.status(400).json({ message: error_4.message });
                    }
                    else {
                        res.status(400).json({ message: 'An unknown error occurred' });
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    DailyTaskController.deleteTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var deleted, error_5;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, this.taskService.delete(req.params.id)];
                case 1:
                    deleted = _b.sent();
                    if (!deleted) {
                        res.status(404).json({ message: 'Task not found' });
                        return [2 /*return*/];
                    }
                    res.status(204).send();
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _b.sent();
                    if (error_5 instanceof Error) {
                        res.status(500).json({ message: error_5.message });
                    }
                    else {
                        res.status(500).json({ message: 'An unknown error occurred' });
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    DailyTaskController.markTaskComplete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var task, error_6;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, this.taskService.markAsComplete(req.params.id)];
                case 1:
                    task = _b.sent();
                    res.json(task);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _b.sent();
                    if (error_6 instanceof Error) {
                        res.status(400).json({ message: error_6.message });
                    }
                    else {
                        res.status(400).json({ message: 'An unknown error occurred' });
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return DailyTaskController;
}());
exports.default = DailyTaskController;
//# sourceMappingURL=dailyTasks.controller.js.map