"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRouter = exports.publicRouter = void 0;
var express_1 = require("express");
var auth_middleware_1 = require("../Middlewares/auth.middleware");
var expense_controller_1 = __importDefault(require("../Controller/expense.controller"));
var auth_controller_1 = __importDefault(require("../Controller/auth.controller"));
var habit_controller_1 = __importDefault(require("../Controller/habit.controller"));
var emergency_controller_1 = __importDefault(require("../Controller/emergency.controller"));
var notification_controller_1 = __importDefault(require("../Controller/notification.controller"));
var error_middleware_1 = require("../Middlewares/error.middleware");
var protectedRouter_1 = __importDefault(require("../utils/protectedRouter"));
exports.protectedRouter = protectedRouter_1.default;
var customPlanInstallment_controller_1 = require("../Controller/customPlanInstallment.controller");
var referral_controller_1 = require("../Controller/referral.controller");
var getCurrency_1 = require("../Middlewares/getCurrency");
var dailyTask_controller_1 = __importDefault(require("../Controller/dailyTask.controller"));
var savingsGoal_controller_1 = __importDefault(require("../Controller/savingsGoal.controller"));
var majorGoals_controller_1 = __importDefault(require("../Controller/majorGoals.controller"));
var income_controller_1 = require("../Controller/income.controller");
var installment_controller_1 = require("../Controller/installment.controller");
var user_controller_1 = __importDefault(require("../Controller/user.controller"));
var publicRouter = (0, express_1.Router)();
exports.publicRouter = publicRouter;
/* ---------------------- Public Routes ---------------------- */
// Currency route
publicRouter.get('/currency', getCurrency_1.getCurrency, function (req, res) {
    res.json({ currency: req.userCurrency });
});
// Authentication
publicRouter.post('/register', (0, error_middleware_1.asyncHandler)(auth_controller_1.default.register));
publicRouter.post('/login', (0, error_middleware_1.asyncHandler)(auth_controller_1.default.login));
publicRouter.post('/google', (0, error_middleware_1.asyncHandler)(auth_controller_1.default.googleAuth)); // Google auth route
/* ---------------------- Protected Routes ---------------------- */
// All routes below this require authentication middleware
protectedRouter_1.default.use((0, error_middleware_1.asyncHandler)(auth_middleware_1.authenticate));
//users
protectedRouter_1.default.get('/users', (0, error_middleware_1.asyncHandler)(user_controller_1.default.getAllUsers));
// Expenses
protectedRouter_1.default.post('/expenses', (0, error_middleware_1.asyncHandler)(expense_controller_1.default.addExpense));
protectedRouter_1.default.get('/expenses', (0, error_middleware_1.asyncHandler)(expense_controller_1.default.getExpenses));
protectedRouter_1.default.get('/expenses/:month/:year', (0, error_middleware_1.asyncHandler)(expense_controller_1.default.getMonthlyReport));
// Habits
protectedRouter_1.default.post('/habits', (0, error_middleware_1.asyncHandler)(habit_controller_1.default.addHabit));
protectedRouter_1.default.get('/habits', (0, error_middleware_1.asyncHandler)(habit_controller_1.default.getHabits));
protectedRouter_1.default.patch('/habits/:id', (0, error_middleware_1.asyncHandler)(habit_controller_1.default.markHabitComplete));
// Emergency
protectedRouter_1.default.post('/emergency', (0, error_middleware_1.asyncHandler)(emergency_controller_1.default.addToEmergencyFund));
protectedRouter_1.default.get('/emergency', (0, error_middleware_1.asyncHandler)(emergency_controller_1.default.getEmergencyFunds));
// Notifications
protectedRouter_1.default.get('/notification', (0, error_middleware_1.asyncHandler)(notification_controller_1.default.testNotification));
protectedRouter_1.default.patch('/notification/:id', (0, error_middleware_1.asyncHandler)(notification_controller_1.default.markNotificationRead));
protectedRouter_1.default.delete('/notification/:id', (0, error_middleware_1.asyncHandler)(notification_controller_1.default.testNotification));
// Daily Tasks
protectedRouter_1.default.post('/dailyTask', (0, error_middleware_1.asyncHandler)(dailyTask_controller_1.default.createTask));
protectedRouter_1.default.get('/dailyTask', (0, error_middleware_1.asyncHandler)(dailyTask_controller_1.default.getTasks));
protectedRouter_1.default.get('/dailyTask/:id', (0, error_middleware_1.asyncHandler)(dailyTask_controller_1.default.getTaskById));
protectedRouter_1.default.patch('/dailyTask/:id', (0, error_middleware_1.asyncHandler)(dailyTask_controller_1.default.updateTask));
protectedRouter_1.default.patch('/dailyTask/:id/complete', (0, error_middleware_1.asyncHandler)(dailyTask_controller_1.default.markTaskComplete));
protectedRouter_1.default.delete('/dailyTask/:id', (0, error_middleware_1.asyncHandler)(dailyTask_controller_1.default.deleteTask));
// Savings Goals
protectedRouter_1.default.post('/savingsGoals', (0, error_middleware_1.asyncHandler)(savingsGoal_controller_1.default.createSavingsGoal));
protectedRouter_1.default.get('/savingsGoals', (0, error_middleware_1.asyncHandler)(savingsGoal_controller_1.default.getUserSavingsGoals));
protectedRouter_1.default.get('/savingsGoals/:id', (0, error_middleware_1.asyncHandler)(savingsGoal_controller_1.default.getSavingsGoalById));
protectedRouter_1.default.put('/savingsGoals/:id', (0, error_middleware_1.asyncHandler)(savingsGoal_controller_1.default.updateSavingsGoal));
protectedRouter_1.default.delete('/savingsGoals/:id', (0, error_middleware_1.asyncHandler)(savingsGoal_controller_1.default.deleteSavingsGoal));
protectedRouter_1.default.post('/savingsGoals/:id', (0, error_middleware_1.asyncHandler)(savingsGoal_controller_1.default.addToSavingsGoal));
// Major Goals
protectedRouter_1.default.post('/majorGoals', (0, error_middleware_1.asyncHandler)(majorGoals_controller_1.default.createMajorGoal));
protectedRouter_1.default.get('/majorGoals', (0, error_middleware_1.asyncHandler)(majorGoals_controller_1.default.getUserMajorGoals));
protectedRouter_1.default.get('/majorGoals/:id', (0, error_middleware_1.asyncHandler)(majorGoals_controller_1.default.getMajorGoalById));
protectedRouter_1.default.put('/majorGoals/:id', (0, error_middleware_1.asyncHandler)(majorGoals_controller_1.default.updateMajorGoal));
protectedRouter_1.default.delete('/majorGoals/:id', (0, error_middleware_1.asyncHandler)(majorGoals_controller_1.default.deleteMajorGoal));
protectedRouter_1.default.patch('/majorGoals/:id', (0, error_middleware_1.asyncHandler)(majorGoals_controller_1.default.updateProgress)); // بدون slash زائدة
// Incomes
protectedRouter_1.default.post('/incomes', (0, error_middleware_1.asyncHandler)(income_controller_1.IncomeController.addIncome));
protectedRouter_1.default.get('/incomes', (0, error_middleware_1.asyncHandler)(income_controller_1.IncomeController.getUserIncomes));
protectedRouter_1.default.get('/incomes/:year/:month', (0, error_middleware_1.asyncHandler)(income_controller_1.IncomeController.getIncomesByDate));
protectedRouter_1.default.get('/incomes/:id', (0, error_middleware_1.asyncHandler)(income_controller_1.IncomeController.getIncomeById));
protectedRouter_1.default.put('/incomes/:id', (0, error_middleware_1.asyncHandler)(income_controller_1.IncomeController.updateIncome));
protectedRouter_1.default.delete('/incomes/:id', (0, error_middleware_1.asyncHandler)(income_controller_1.IncomeController.deleteIncome));
// Installments
protectedRouter_1.default.post('/installments', (0, error_middleware_1.asyncHandler)(installment_controller_1.InstallmentController.addInstallment));
protectedRouter_1.default.get('/installments', (0, error_middleware_1.asyncHandler)(installment_controller_1.InstallmentController.getUserInstallments));
protectedRouter_1.default.get('/installments/:id', (0, error_middleware_1.asyncHandler)(installment_controller_1.InstallmentController.getInstallmentById));
protectedRouter_1.default.patch('/installments/:id/pay', (0, error_middleware_1.asyncHandler)(installment_controller_1.InstallmentController.markInstallmentPaid));
protectedRouter_1.default.put('/installments/:id', (0, error_middleware_1.asyncHandler)(installment_controller_1.InstallmentController.updateInstallment));
protectedRouter_1.default.delete('/installments/:id', (0, error_middleware_1.asyncHandler)(installment_controller_1.InstallmentController.deleteInstallment));
// Custom Installment Plans
protectedRouter_1.default.post('/custom-installment-plans', (0, error_middleware_1.asyncHandler)(customPlanInstallment_controller_1.CustomInstallmentPlanController.addPlan));
protectedRouter_1.default.get('/custom-installment-plans', (0, error_middleware_1.asyncHandler)(customPlanInstallment_controller_1.CustomInstallmentPlanController.getPlans));
protectedRouter_1.default.get('/custom-installment-plans/:id', (0, error_middleware_1.asyncHandler)(customPlanInstallment_controller_1.CustomInstallmentPlanController.getPlanById));
protectedRouter_1.default.put('/custom-installment-plans/:id', (0, error_middleware_1.asyncHandler)(customPlanInstallment_controller_1.CustomInstallmentPlanController.updatePlan));
protectedRouter_1.default.delete('/custom-installment-plans/:id', (0, error_middleware_1.asyncHandler)(customPlanInstallment_controller_1.CustomInstallmentPlanController.deletePlan));
// Referral system (view users referred by the logged-in user)
protectedRouter_1.default.get('/referrals', (0, error_middleware_1.asyncHandler)(referral_controller_1.getReferrals));
//# sourceMappingURL=index.js.map