import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../Middlewares/auth.middleware';
import ExpenseController from '../Controller/expense.controller';
import AuthController from '../Controller/auth.controller';
import HabitController from '../Controller/habit.controller';
import GoalController from '../Controller/goal.controller';
import EmergencyController from '../Controller/emergency.controller';

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
router.post('/expenses', asyncHandler(ExpenseController.addExpense));
router.get('/expenses', asyncHandler(ExpenseController.getExpenses));
router.get('/expenses/report/:month/:year', asyncHandler(ExpenseController.getMonthlyReport));

// Habit routes
router.post('/', asyncHandler(HabitController.addHabit));
router.get('/', asyncHandler(HabitController.getHabits));
router.patch('/:id', asyncHandler(HabitController.markHabitComplete));

// Goal routes
router.post('/goals', asyncHandler(GoalController.addGoal));
router.get('/goals', asyncHandler(GoalController.getGoals));
router.post('/goals/:id/contribute', asyncHandler(GoalController.contributeToGoal));

// Emergency fund routes
router.post('/emergency', asyncHandler(EmergencyController.addToEmergencyFund));
router.get('/emergency', asyncHandler(EmergencyController.getEmergencyFunds));

// Global error handler
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default router;
