import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../Middlewares/auth.middleware';
import ExpenseController from '../Controller/expense.controller';
import AuthController from '../Controller/auth.controller';
import HabitController from '../Controller/habit.controller';
import EmergencyController from '../Controller/emergency.controller';
import { IncomeController } from '../Controller/Income.controller';
import { InstallmentController } from '../Controller/Installmen.controller';
import NotificationController from '../Controller/notification.controller';
import { asyncHandler } from '../Middlewares/error.middleware';
import SavingsGoalController from '../Controller/savingsGoal.controller';
import DailyTaskController from '../Controller/dailyTask.controller';
import MajorGoalController from '../Controller/majorGoal.controller';
import protectedRouter from '../utils/protectedRouter';

// Authentication routes
protectedRouter.post('/register', asyncHandler(AuthController.register));
protectedRouter.post('/login', asyncHandler(AuthController.login));

// Expense routes
protectedRouter.post('/expenses', asyncHandler(ExpenseController.addExpense));
protectedRouter.get('/expenses', asyncHandler(ExpenseController.getExpenses));
protectedRouter.get('/expenses/:month/:year', asyncHandler(ExpenseController.getMonthlyReport));

// Habit routes
protectedRouter.post('/habits', asyncHandler(HabitController.addHabit));
protectedRouter.get('/habits', asyncHandler(HabitController.getHabits));
protectedRouter.patch('/habits/:id', asyncHandler(HabitController.markHabitComplete));

// Emergency fund routes
protectedRouter.post('/emergency', asyncHandler(EmergencyController.addToEmergencyFund));
protectedRouter.get('/emergency', asyncHandler(EmergencyController.getEmergencyFunds));

// Notification routes   // I have a problem
protectedRouter.get('/notification', asyncHandler(NotificationController.testNotification));
protectedRouter.patch('/notification/:id', asyncHandler(NotificationController.markNotificationRead));
protectedRouter.delete('/notification/:id', asyncHandler(NotificationController.testNotification));

// Daily Task routes
protectedRouter.post('/dailyTask', asyncHandler(DailyTaskController.createTask));
protectedRouter.get('/dailyTask', asyncHandler(DailyTaskController.getTasks));
protectedRouter.get('/dailyTask/:id', asyncHandler(DailyTaskController.getTaskById));
protectedRouter.patch('/dailyTask/:id', asyncHandler(DailyTaskController.updateTask));
protectedRouter.patch('/dailyTask/:id/complete', asyncHandler(DailyTaskController.markTaskComplete)); // optional, if separate
protectedRouter.delete('/dailyTask/:id', asyncHandler(DailyTaskController.deleteTask));

// Savings Goal routes
protectedRouter.post('/savingsGoals', asyncHandler(SavingsGoalController.createSavingsGoal));
protectedRouter.get('/savingsGoals', asyncHandler(SavingsGoalController.getUserSavingsGoals));
protectedRouter.get('/savingsGoals/:id', asyncHandler(SavingsGoalController.getSavingsGoalById));
protectedRouter.put('/savingsGoals/:id', asyncHandler(SavingsGoalController.updateSavingsGoal));
protectedRouter.delete('/savingsGoals/:id', asyncHandler(SavingsGoalController.deleteSavingsGoal));
protectedRouter.post('/savingsGoals/:id', asyncHandler(SavingsGoalController.addToSavingsGoal));

// Major Goal routes
protectedRouter.post('/majorGoals', asyncHandler(MajorGoalController.createMajorGoal));
protectedRouter.get('/majorGoals', asyncHandler(MajorGoalController.getUserMajorGoals));
protectedRouter.get('/majorGoals/:id', asyncHandler(MajorGoalController.getMajorGoalById));
protectedRouter.put('/majorGoals/:id', asyncHandler(MajorGoalController.updateMajorGoal));
protectedRouter.delete('/majorGoals/:id', asyncHandler(MajorGoalController.deleteMajorGoal));
protectedRouter.patch('/majorGoals/:id/', asyncHandler(MajorGoalController.updateProgress));
// protectedRouter.post('/major-goals/:id/link-saving', asyncHandler(MajorGoalController.linkSavingsGoal));


// // Income routes
// protectedRouter.post('/incomes', asyncHandler(IncomeController.addIncome));
// protectedRouter.get('/incomes', asyncHandler(IncomeController.getIncomes));
// protectedRouter.get('/incomes/:month/:year', asyncHandler(IncomeController.getMonthlyIncomes));

// // Installment routes
// protectedRouter.post('/installments', asyncHandler(InstallmentController.addInstallment));
// protectedRouter.get('/installments', asyncHandler(InstallmentController.getInstallments));
// protectedRouter.patch('/installments/:id/pay', asyncHandler(InstallmentController.markInstallmentPaid));

// // Custom Installment Plan routes
// protectedRouter.post('/custom-installment-plans', asyncHandler(InstallmentController.addPlan));
// protectedRouter.get('/custom-installment-plans', asyncHandler(InstallmentController.getPlans));
// protectedRouter.delete('/custom-installment-plans/:id', asyncHandler(InstallmentController.deletePlan));



export default protectedRouter;