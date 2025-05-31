import { Router, Request, Response } from 'express';
import { authenticate } from '../Middlewares/auth.middleware';
import { asyncHandler } from '../Middlewares/error.middleware';
import { getReferrals } from '../Controller/referral.controller';
import AuthController from '../Controller/auth.controller';
import ExpenseController from '../Controller/expense.controller';
import HabitController from '../Controller/habit.controller';
import EmergencyController from '../Controller/emergency.controller';
import { IncomeController } from '../Controller/Income.controller';
import { InstallmentController } from '../Controller/Installmen.controller';
import NotificationController from '../Controller/notification.controller';
import DailyTaskController from '../Controller/DailyTask.controller';
import SavingsGoalController from '../Controller/SavingsGoal.Controller';
import MajorGoalController from '../Controller/MajorGoal.Controller';
import { CustomInstallmentPlanController } from '../Controller/customPlanInstallment.controller';
import { UserController } from '../Controller/User.controller';
const getCurrency = require('../middlewares/getCurrency');

const publicRouter = Router();
const protectedRouter = Router();
const userController = new UserController();

/* ---------------------- Public Routes ---------------------- */

// Currency route
publicRouter.get('/currency', getCurrency, (req: Request, res: Response) => {
  res.json({ currency: (req as any).userCurrency });
});

// Authentication
publicRouter.post('/register', asyncHandler(AuthController.register));
publicRouter.post('/login', asyncHandler(AuthController.login));

/* ---------------------- Protected Routes ---------------------- */

// All routes below this require authentication
protectedRouter.use(asyncHandler(authenticate));

/* --- User Management (Admin) --- */
protectedRouter.get('/admin/users', asyncHandler(userController.getAllUsers));
protectedRouter.get('/admin/users/:id', asyncHandler(userController.getUserById));
protectedRouter.patch('/admin/users/:id/status', asyncHandler(userController.updateUserStatus));

/* --- Expenses --- */
protectedRouter.post('/expenses', asyncHandler(ExpenseController.addExpense));
protectedRouter.get('/expenses', asyncHandler(ExpenseController.getExpenses));
protectedRouter.get('/expenses/:month/:year', asyncHandler(ExpenseController.getMonthlyReport));

/* --- Habits --- */
protectedRouter.post('/habits', asyncHandler(HabitController.addHabit));
protectedRouter.get('/habits', asyncHandler(HabitController.getHabits));
protectedRouter.patch('/habits/:id', asyncHandler(HabitController.markHabitComplete));

/* --- Emergency --- */
protectedRouter.post('/emergency', asyncHandler(EmergencyController.addToEmergencyFund));
protectedRouter.get('/emergency', asyncHandler(EmergencyController.getEmergencyFunds));

/* --- Notifications --- */
protectedRouter.get('/notification', asyncHandler(NotificationController.testNotification));
protectedRouter.patch('/notification/:id', asyncHandler(NotificationController.markNotificationRead));
protectedRouter.delete('/notification/:id', asyncHandler(NotificationController.testNotification));

/* --- Daily Tasks --- */
protectedRouter.post('/dailyTask', asyncHandler(DailyTaskController.createTask));
protectedRouter.get('/dailyTask', asyncHandler(DailyTaskController.getTasks));
protectedRouter.get('/dailyTask/:id', asyncHandler(DailyTaskController.getTaskById));
protectedRouter.patch('/dailyTask/:id', asyncHandler(DailyTaskController.updateTask));
protectedRouter.patch('/dailyTask/:id/complete', asyncHandler(DailyTaskController.markTaskComplete));
protectedRouter.delete('/dailyTask/:id', asyncHandler(DailyTaskController.deleteTask));

/* --- Savings Goals --- */
protectedRouter.post('/savingsGoals', asyncHandler(SavingsGoalController.createSavingsGoal));
protectedRouter.get('/savingsGoals', asyncHandler(SavingsGoalController.getUserSavingsGoals));
protectedRouter.get('/savingsGoals/:id', asyncHandler(SavingsGoalController.getSavingsGoalById));
protectedRouter.put('/savingsGoals/:id', asyncHandler(SavingsGoalController.updateSavingsGoal));
protectedRouter.delete('/savingsGoals/:id', asyncHandler(SavingsGoalController.deleteSavingsGoal));
protectedRouter.post('/savingsGoals/:id', asyncHandler(SavingsGoalController.addToSavingsGoal));

/* --- Major Goals --- */
protectedRouter.post('/majorGoals', asyncHandler(MajorGoalController.createMajorGoal));
protectedRouter.get('/majorGoals', asyncHandler(MajorGoalController.getUserMajorGoals));
protectedRouter.get('/majorGoals/:id', asyncHandler(MajorGoalController.getMajorGoalById));
protectedRouter.put('/majorGoals/:id', asyncHandler(MajorGoalController.updateMajorGoal));
protectedRouter.delete('/majorGoals/:id', asyncHandler(MajorGoalController.deleteMajorGoal));
protectedRouter.patch('/majorGoals/:id', asyncHandler(MajorGoalController.updateProgress));

/* --- Incomes --- */
protectedRouter.post('/incomes', asyncHandler(IncomeController.addIncome));
protectedRouter.get('/incomes', asyncHandler(IncomeController.getUserIncomes));
protectedRouter.get('/incomes/:year/:month', asyncHandler(IncomeController.getIncomesByDate));
protectedRouter.get('/incomes/:id', asyncHandler(IncomeController.getIncomeById));
protectedRouter.put('/incomes/:id', asyncHandler(IncomeController.updateIncome));
protectedRouter.delete('/incomes/:id', asyncHandler(IncomeController.deleteIncome));

/* --- Installments --- */
protectedRouter.post('/installments', asyncHandler(InstallmentController.addInstallment));
protectedRouter.get('/installments', asyncHandler(InstallmentController.getUserInstallments));
protectedRouter.get('/installments/:id', asyncHandler(InstallmentController.getInstallmentById));
protectedRouter.patch('/installments/:id/pay', asyncHandler(InstallmentController.markInstallmentPaid));
protectedRouter.put('/installments/:id', asyncHandler(InstallmentController.updateInstallment));
protectedRouter.delete('/installments/:id', asyncHandler(InstallmentController.deleteInstallment));

/* --- Custom Installment Plans --- */
protectedRouter.post('/custom-installment-plans', asyncHandler(CustomInstallmentPlanController.addPlan));
protectedRouter.get('/custom-installment-plans', asyncHandler(CustomInstallmentPlanController.getPlans));
protectedRouter.get('/custom-installment-plans/:id', asyncHandler(CustomInstallmentPlanController.getPlanById));
protectedRouter.put('/custom-installment-plans/:id', asyncHandler(CustomInstallmentPlanController.updatePlan));
protectedRouter.delete('/custom-installment-plans/:id', asyncHandler(CustomInstallmentPlanController.deletePlan));

/* --- Referrals --- */
protectedRouter.get('/referrals', asyncHandler(getReferrals));

export { publicRouter, protectedRouter };
