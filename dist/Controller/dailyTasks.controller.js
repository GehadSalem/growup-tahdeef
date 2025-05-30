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
require("../types/express");
const dailyTask_service_1 = require("../Services/dailyTask.service");
class DailyTaskController {
}
_a = DailyTaskController;
DailyTaskController.taskService = new dailyTask_service_1.DailyTaskService();
DailyTaskController.createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const task = yield _a.taskService.create(req.user.id, req.body);
        res.status(201).json(task);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});
DailyTaskController.getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const tasks = yield _a.taskService.getAll(req.user.id);
        res.json(tasks);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});
DailyTaskController.getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const task = yield _a.taskService.getById((_b = req.params) === null || _b === void 0 ? void 0 : _b.id);
        if (!task) { // <-- Error points here if getById returns void
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
DailyTaskController.updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield _a.taskService.update(req.params.id, req.body);
        if (!updated) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.json(updated);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});
DailyTaskController.deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield _a.taskService.delete(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});
DailyTaskController.markTaskComplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield _a.taskService.markAsComplete(req.params.id);
        res.json(task);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});
exports.default = DailyTaskController;
