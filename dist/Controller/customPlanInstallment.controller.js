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
exports.CustomInstallmentPlanController = void 0;
require("../types/express");
const customPlanInstallment_service_1 = require("../Services/customPlanInstallment.service");
const users_service_1 = require("../Services/users.service");
const CustomInstallmentPlan_1 = require("../entities/CustomInstallmentPlan");
const MajorGoal_1 = require("../entities/MajorGoal");
const data_source_1 = require("../dbConfig/data-source");
class CustomInstallmentPlanController {
    static calculateMonthlyPayment(principal, annualRate, months) {
        if (annualRate === 0)
            return principal / months;
        const monthlyRate = annualRate / 100 / 12;
        return principal * monthlyRate * Math.pow(1 + monthlyRate, months) /
            (Math.pow(1 + monthlyRate, months) - 1);
    }
}
exports.CustomInstallmentPlanController = CustomInstallmentPlanController;
_a = CustomInstallmentPlanController;
CustomInstallmentPlanController.service = new customPlanInstallment_service_1.CustomInstallmentPlanService();
CustomInstallmentPlanController.userService = new users_service_1.UserService();
CustomInstallmentPlanController.addPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, totalCost, downPayment, monthsCount, interestRate, linkedGoalId } = req.body;
        // Basic validation
        if (!productName || !totalCost || !monthsCount) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        // Create new plan
        const plan = new CustomInstallmentPlan_1.CustomInstallmentPlan();
        plan.productName = productName;
        plan.totalCost = totalCost;
        plan.downPayment = downPayment || 0;
        plan.monthsCount = monthsCount;
        plan.interestRate = interestRate || 0;
        // Calculate monthly installment
        plan.monthlyInstallment = _a.calculateMonthlyPayment(totalCost - (downPayment || 0), interestRate || 0, monthsCount);
        // Link to goal if provided
        if (linkedGoalId) {
            const goal = yield data_source_1.AppDataSource.getRepository(MajorGoal_1.MajorGoal).findOneBy({ id: linkedGoalId });
            if (!goal) {
                res.status(404).json({ message: 'Linked goal not found' });
                return;
            }
            plan.linkedGoal = goal;
        }
        // Save to database
        const savedPlan = yield data_source_1.AppDataSource.getRepository(CustomInstallmentPlan_1.CustomInstallmentPlan).save(plan);
        res.status(201).json(savedPlan);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
CustomInstallmentPlanController.getPlans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information is missing.' });
            return;
        }
        const user = yield _a.userService.getUserById(req.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        const plans = yield _a.service.getUserPlans(user);
        res.json(plans);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
CustomInstallmentPlanController.getPlanById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information is missing.' });
            return;
        }
        const user = yield _a.userService.getUserById(req.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        const plan = yield _a.service.getPlanById(req.params.id, user);
        if (!plan) {
            res.status(404).json({ message: 'Plan not found.' });
            return;
        }
        res.json(plan);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
CustomInstallmentPlanController.updatePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information is missing.' });
            return;
        }
        const user = yield _a.userService.getUserById(req.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        const updatedPlan = yield _a.service.updatePlan(req.params.id, req.body, user);
        if (!updatedPlan) {
            res.status(404).json({ message: 'Plan not found.' });
            return;
        }
        res.json(updatedPlan);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
CustomInstallmentPlanController.deletePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information is missing.' });
            return;
        }
        const user = yield _a.userService.getUserById(req.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        const success = yield _a.service.deletePlan(req.params.id, user);
        if (!success) {
            res.status(404).json({ message: 'Plan not found.' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
// Add this new method to get plans for a specific goal
CustomInstallmentPlanController.getPlansForGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information is missing.' });
            return;
        }
        const user = yield _a.userService.getUserById(req.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        const goalId = req.params.goalId;
        const goal = yield _a.MajorGoalService.getMajorGoalById(goalId);
        if (!goal || goal.user.id !== user.id) {
            res.status(404).json({ message: 'Goal not found or access denied.' });
            return;
        }
        const plans = yield _a.service.getPlansForGoal(goalId);
        res.json(plans);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
