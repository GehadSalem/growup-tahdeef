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
const users_service_1 = require("../Services/users.service");
const savingsGoals_service_1 = require("../Services/savingsGoals.service");
class SavingsGoalController {
}
_a = SavingsGoalController;
SavingsGoalController.savingsGoalService = new savingsGoals_service_1.SavingsGoalService();
SavingsGoalController.userService = new users_service_1.UserService();
SavingsGoalController.createSavingsGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!((_b = req.user) === null || _b === void 0 ? void 0 : _b.id)) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const user = yield _a.userService.getUserById(req.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // We've confirmed user exists, so we can safely pass it
        const newGoal = yield _a.savingsGoalService.createSavingsGoal(user, req.body);
        res.status(201).json(newGoal);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
SavingsGoalController.getUserSavingsGoals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information is missing in the request' });
            return;
        }
        const goals = yield _a.savingsGoalService.getUserSavingsGoals(req.user.id);
        res.json(goals);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
SavingsGoalController.getSavingsGoalById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const goalId = req.params.id;
        // Optional: check if user is authenticated (depends on your auth logic)
        if (!((_b = req.user) === null || _b === void 0 ? void 0 : _b.id)) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const goal = yield _a.savingsGoalService.getSavingsGoalById(goalId);
        if (!goal) {
            res.status(404).json({ message: 'Savings goal not found' });
            return;
        }
        // Optional: ensure the goal belongs to the requesting user (security check)
        if (goal.user.id !== req.user.id) {
            res.status(403).json({ message: 'Forbidden: Access denied' });
            return;
        }
        res.json(goal);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
SavingsGoalController.updateSavingsGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedGoal = yield _a.savingsGoalService.updateSavingsGoal(req.params.id, req.body);
        res.json(updatedGoal);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
SavingsGoalController.deleteSavingsGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _a.savingsGoalService.deleteSavingsGoal(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
SavingsGoalController.addToSavingsGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        const updatedGoal = yield _a.savingsGoalService.addToSavingsGoal(req.params.id, amount);
        res.json(updatedGoal);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = SavingsGoalController;
