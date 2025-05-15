import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../Middlewares/auth.middleware';
import ExpenseController from '../Controller/expense.controller';
import AuthController from '../Controller/auth.controller';
import HabitController from '../Controller/habit.controller';
import EmergencyController from '../Controller/emergency.controller';
import { IncomeController } from '../Controller/Income.controller';
import { InstallmentController } from '../Controller/Installmen.controller';
import NotificationController from '../Controller/notification.controller';
import SavingsGoalController from '../Controller/SavingsGoal.Controller';
import MajorGoalController from '../Controller/MajorGoal.Controller';
import DailyTaskController from '../Controller/DailyTask.controller';
const router = Router();

// Error handling wrapper
const asyncHandler = (fn: Function) => 
  (req: Request, res: Response, next: NextFunction) => 
    Promise.resolve(fn(req, res, next)).catch(next);

// Authentication routes
router.post('/register', asyncHandler(AuthController.register));
router.post('/login', asyncHandler(AuthController.login));

// Protected routes
router.use(asyncHandler(authenticate));

// Expense routes
router.post('/', asyncHandler(ExpenseController.addExpense));
router.get('/', asyncHandler(ExpenseController.getExpenses));
router.get('/:month/:year', asyncHandler(ExpenseController.getMonthlyReport));

// Habit routes
router.post('/', asyncHandler(HabitController.addHabit));
router.get('/', asyncHandler(HabitController.getHabits));
router.patch('/:id', asyncHandler(HabitController.markHabitComplete));

// Emergency fund routes
router.post('/', asyncHandler(EmergencyController.addToEmergencyFund));
router.get('/', asyncHandler(EmergencyController.getEmergencyFunds));

// Notification routes
router.get('/', asyncHandler(NotificationController.testNotification));
router.patch('/:id/read', asyncHandler(NotificationController.markNotificationRead));
router.delete('/:id', asyncHandler(NotificationController.testNotification));

// Daily Task routes
router.post('/', asyncHandler(DailyTaskController.createTask));
router.get('/', asyncHandler(DailyTaskController.getTasks));
router.get('/:id', asyncHandler(DailyTaskController.getTaskById));
router.patch('/:id', asyncHandler(DailyTaskController.updateTask));
router.patch('/:id/complete', asyncHandler(DailyTaskController.markTaskComplete)); // optional, if separate
router.delete('/:id', asyncHandler(DailyTaskController.deleteTask));


//لحد هنا تم التيست ////////////////////////////////////////////////////////////////////
// Savings Goal routes
router.post('/savings-goals', asyncHandler(SavingsGoalController.createSavingsGoal));
router.get('/savings-goals', asyncHandler(SavingsGoalController.getUserSavingsGoals));
// router.get('/savings-goals/:id', asyncHandler(SavingsGoalController.getSavingsGoalById));
router.put('/savings-goals/:id', asyncHandler(SavingsGoalController.createSavingsGoal));
router.delete('/savings-goals/:id', asyncHandler(SavingsGoalController.deleteSavingsGoal));
router.post('/savings-goals/:id/contribute', asyncHandler(SavingsGoalController.addToSavingsGoal));

// Major Goal routes
router.post('/major-goals', asyncHandler(MajorGoalController.createMajorGoal));
router.get('/major-goals', asyncHandler(MajorGoalController.getUserMajorGoals));
router.get('/major-goals/:id', asyncHandler(MajorGoalController.getMajorGoalById));
router.put('/major-goals/:id', asyncHandler(MajorGoalController.updateMajorGoal));
router.delete('/major-goals/:id', asyncHandler(MajorGoalController.deleteMajorGoal));
router.patch('/major-goals/:id/progress', asyncHandler(MajorGoalController.updateProgress));
// router.post('/major-goals/:id/link-saving', asyncHandler(MajorGoalController.linkSavingsGoal));


// Income routes
router.post('/incomes', asyncHandler(IncomeController.addIncome));
router.get('/incomes', asyncHandler(IncomeController.getIncomes));
router.get('/incomes/:month/:year', asyncHandler(IncomeController.getMonthlyIncomes));

// Installment routes
router.post('/installments', asyncHandler(InstallmentController.addInstallment));
router.get('/installments', asyncHandler(InstallmentController.getInstallments));
router.patch('/installments/:id/pay', asyncHandler(InstallmentController.markInstallmentPaid));

// Custom Installment Plan routes
router.post('/custom-installment-plans', asyncHandler(InstallmentController.addPlan));
router.get('/custom-installment-plans', asyncHandler(InstallmentController.getPlans));
router.delete('/custom-installment-plans/:id', asyncHandler(InstallmentController.deletePlan));


// Global error handler
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default router;
