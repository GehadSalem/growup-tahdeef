import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../Middlewares/auth.middleware';
import ExpenseController from '../Controller/expense.controller';
import AuthController from '../Controller/auth.controller';
import HabitController from '../Controller/habit.controller';
import EmergencyController from '../Controller/emergency.controller';
import NotificationController from '../Controller/notification.controller';
import { asyncHandler } from '../Middlewares/error.middleware';
import protectedRouter from '../utils/protectedRouter';
import { CustomInstallmentPlanController } from '../Controller/customPlanInstallment.controller';
import { getReferrals } from '../Controller/referral.controller';
import { getCurrency } from '../Middlewares/getCurrency';
import DailyTaskController from '../Controller/dailyTasks.controller';
import SavingsGoalController from '../Controller/savingsGoals.controller';
import MajorGoalController from '../Controller/majorGoals.controller';
import IncomeController from '../Controller/incomes.controller';
import InstallmentController from '../Controller/installment.controller';

const publicRouter = Router();

// Error handling wrapper (if you still want to use it alongside asyncHandler)
const catchHandler = (fn: Function) => 
  (req: Request, res: Response, next: NextFunction) => 
    Promise.resolve(fn(req, res, next)).catch(next);

/* ---------------------- Public Routes ---------------------- */

// Currency route
publicRouter.get('/currency', getCurrency, (req: Request, res: Response) => {
  res.json({ currency: (req as any).userCurrency });
});

// Authentication routes
publicRouter.post('/register', asyncHandler(AuthController.register));
publicRouter.post('/login', asyncHandler(AuthController.login));
publicRouter.post('/google', asyncHandler(AuthController.googleAuth)); // Google auth route

/* ---------------------- Protected Routes ---------------------- */

// All routes below this require authentication middleware
protectedRouter.use(asyncHandler(authenticate));

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

// Notification routes
protectedRouter.get('/notification', asyncHandler(NotificationController.testNotification));
protectedRouter.patch('/notification/:id', asyncHandler(NotificationController.markNotificationRead));
protectedRouter.delete('/notification/:id', asyncHandler(NotificationController.testNotification));

// Daily Task routes
protectedRouter.post('/dailyTask', asyncHandler(DailyTaskController.createTask));
protectedRouter.get('/dailyTask', asyncHandler(DailyTaskController.getTasks));
protectedRouter.get('/dailyTask/:id', asyncHandler(DailyTaskController.getTaskById));
protectedRouter.patch('/dailyTask/:id', asyncHandler(DailyTaskController.updateTask));
protectedRouter.patch('/dailyTask/:id/complete', asyncHandler(DailyTaskController.markTaskComplete));
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
protectedRouter.patch('/majorGoals/:id', asyncHandler(MajorGoalController.updateProgress));

// Income routes
protectedRouter.post('/incomes', asyncHandler(IncomeController.addIncome));
protectedRouter.get('/incomes', asyncHandler(IncomeController.getUserIncomes));
protectedRouter.get('/incomes/:year/:month', asyncHandler(IncomeController.getIncomesByDate));
protectedRouter.get('/incomes/:id', asyncHandler(IncomeController.getIncomeById));
protectedRouter.put('/incomes/:id', asyncHandler(IncomeController.updateIncome));
protectedRouter.delete('/incomes/:id', asyncHandler(IncomeController.deleteIncome));

// Installment routes
protectedRouter.post('/installments', asyncHandler(InstallmentController.addInstallment));
protectedRouter.get('/installments', asyncHandler(InstallmentController.getUserInstallments));
protectedRouter.get('/installments/:id', asyncHandler(InstallmentController.getInstallmentById));
protectedRouter.patch('/installments/:id/pay', asyncHandler(InstallmentController.markInstallmentPaid));
protectedRouter.put('/installments/:id', asyncHandler(InstallmentController.updateInstallment));
protectedRouter.delete('/installments/:id', asyncHandler(InstallmentController.deleteInstallment));

// Custom Installment Plan routes
protectedRouter.post('/custom-installment-plans', asyncHandler(CustomInstallmentPlanController.addPlan));
protectedRouter.get('/custom-installment-plans', asyncHandler(CustomInstallmentPlanController.getPlans));
protectedRouter.get('/custom-installment-plans/:id', asyncHandler(CustomInstallmentPlanController.getPlanById));
protectedRouter.put('/custom-installment-plans/:id', asyncHandler(CustomInstallmentPlanController.updatePlan));
protectedRouter.delete('/custom-installment-plans/:id', asyncHandler(CustomInstallmentPlanController.deletePlan));

// Referral system
protectedRouter.get('/referrals', asyncHandler(getReferrals));

export { publicRouter, protectedRouter };