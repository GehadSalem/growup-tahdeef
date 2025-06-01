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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const expense_service_1 = require("./expense.service");
const majorGoal_service_1 = require("./majorGoal.service");
const savingsGoals_service_1 = require("./savingsGoals.service");
class ReportService {
    constructor() {
        this.expenseService = new expense_service_1.ExpenseService();
        this.majorGoalService = new majorGoal_service_1.MajorGoalService();
        this.savingsGoalService = new savingsGoals_service_1.SavingsGoalService();
    }
    generateFinancialReport(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const monthlyExpenses = yield this.expenseService.getUserExpenses(userId);
            const savingsGoals = yield this.savingsGoalService.getUserSavingsGoals(userId);
            const majorGoals = yield this.majorGoalService.getUserMajorGoals(userId);
            const totalExpenses = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
            const totalSavingsNeeded = savingsGoals.reduce((sum, goal) => sum + (goal.targetAmount - goal.currentAmount), 0);
            const emergencyFund = savingsGoals.find(g => g.isEmergencyFund);
            const emergencyFundAmount = (emergencyFund === null || emergencyFund === void 0 ? void 0 : emergencyFund.currentAmount) || 0;
            // Optional: filter out emergency fund from total savings if needed
            const totalSavingsExcludingEmergency = savingsGoals
                .filter(g => !g.isEmergencyFund)
                .reduce((sum, goal) => sum + (goal.targetAmount - goal.currentAmount), 0);
            return {
                totalExpenses,
                totalSavingsNeeded,
                emergencyFund: {
                    saved: (emergencyFund === null || emergencyFund === void 0 ? void 0 : emergencyFund.currentAmount) || 0,
                    target: (emergencyFund === null || emergencyFund === void 0 ? void 0 : emergencyFund.targetAmount) || 0,
                    progress: emergencyFund
                        ? (emergencyFund.currentAmount / emergencyFund.targetAmount) * 100
                        : 0
                },
                majorGoals: majorGoals.map(goal => ({
                    id: goal.id,
                    name: goal.title,
                    progress: goal.progress,
                    status: goal.status
                }))
            };
        });
    }
}
exports.ReportService = ReportService;
