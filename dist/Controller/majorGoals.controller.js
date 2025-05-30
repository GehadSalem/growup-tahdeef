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
const majorGoal_service_1 = require("../Services/majorGoal.service");
const users_service_1 = require("../Services/users.service");
require("../types/express");
class MajorGoalController {
}
_a = MajorGoalController;
MajorGoalController.majorGoalService = new majorGoal_service_1.MajorGoalService();
MajorGoalController.userService = new users_service_1.UserService();
MajorGoalController.createMajorGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information is missing in the request.' });
            return;
        }
        const user = yield _a.userService.getUserById(req.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        const newGoal = yield _a.majorGoalService.createMajorGoal(user, req.body);
        res.status(201).json(newGoal);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
MajorGoalController.getUserMajorGoals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information is missing in the request.' });
            return;
        }
        const goals = yield _a.majorGoalService.getUserMajorGoals(req.user.id);
        res.json(goals);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
MajorGoalController.updateMajorGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedGoal = yield _a.majorGoalService.updateMajorGoal(req.params.id, req.body);
        res.json(updatedGoal);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
MajorGoalController.deleteMajorGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _a.majorGoalService.deleteMajorGoal(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
MajorGoalController.updateProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { progress } = req.body;
        const updatedGoal = yield _a.majorGoalService.updateProgress(req.params.id, progress);
        res.json(updatedGoal);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
MajorGoalController.getMajorGoalById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const goalId = req.params.id;
        if (!req.user) {
            res.status(400).json({ message: 'User information is missing in the request.' });
            return;
        }
        const goal = yield _a.MajorGoalService.getMajorGoalById(goalId);
        if (!goal) {
            res.status(404).json({ message: 'Major goal not found.' });
            return;
        }
        // Optional: ensure the goal belongs to the current user
        if ((goal === null || goal === void 0 ? void 0 : goal.user.id) !== req.user.id) {
            res.status(403).json({ message: 'Access denied to this goal.' });
            return;
        }
        res.json(goal);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
exports.default = MajorGoalController;
