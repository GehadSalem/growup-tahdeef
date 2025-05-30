import { Request, Response } from 'express';
import { UserService } from '../Services/users.service';
import '../types/express';
import IncomeService from '../Services/income.service';

class IncomeController {
  private static incomeService = new IncomeService();
  private static userService = new UserService();

  static addIncome = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'User information is missing.' });
        return;
      }

      const { amount, description, incomeDate } = req.body;
      
      // Basic validation
      if (!amount || !description || !incomeDate) {
        res.status(400).json({ message: 'Amount, description, and date are required.' });
        return;
      }

      if (amount <= 0) {
        res.status(400).json({ message: 'Amount must be positive.' });
        return;
      }

      const user = await this.userService.getUserById(req.user.id);
      if (!user) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }

      const newIncome = await this.incomeService.createIncome(
        { amount, description, date: new Date(incomeDate) },
        req.user.id
      );
      
      res.status(201).json(newIncome);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  };

  static getUserIncomes = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'User information is missing.' });
        return;
      }

      const incomes = await this.incomeService.getUserIncomes(req.user.id);
      res.json(incomes);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  };

  static updateIncome = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'User information is missing.' });
        return;
      }

      // Validate and extract only allowed fields
      const { amount, date, description } = req.body;

      // Validate amount if provided
      if (amount !== undefined && (typeof amount !== 'number' || amount <= 0)) {
        res.status(400).json({ message: 'Amount must be a positive number.' });
        return;
      }

      // Validate date if provided
      if (date !== undefined && isNaN(new Date(date).getTime())) {
        res.status(400).json({ message: 'Invalid date format.' });
        return;
      }

      const updatedIncome = await this.incomeService.updateIncome(
        req.params.id,
        req.user.id,
        { amount, date: date ? new Date(date) : undefined, description }
      );

      if (!updatedIncome) {
        res.status(404).json({ message: 'Income not found or access denied.' });
        return;
      }

      res.json(updatedIncome);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  };

  static deleteIncome = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'User information is missing.' });
        return;
      }

      const success = await this.incomeService.deleteIncome(req.params.id, req.user.id);
      
      if (!success) {
        res.status(404).json({ message: 'Income not found or access denied.' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  };

  static getIncomeById = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'User information is missing.' });
        return;
      }

      const income = await this.incomeService.getIncomeById(req.params.id, req.user.id);
      
      if (!income) {
        res.status(404).json({ message: 'Income not found or access denied.' });
        return;
      }

      res.json(income);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  };

  static getIncomesByDate = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'User information is missing.' });
        return;
      }

      const { year, month } = req.params;
      const yearNum = parseInt(year);
      const monthNum = month ? parseInt(month) : undefined;

      // Basic validation
      const currentYear = new Date().getFullYear();
      if (isNaN(yearNum)) {
        res.status(400).json({ message: 'Year must be a valid number' });
        return;
      }

      if (yearNum < 2000 || yearNum > currentYear + 1) {
        res.status(400).json({ message: `Year must be between 2000 and ${currentYear + 1}` });
        return;
      }

      if (month && (isNaN(monthNum!) || monthNum! < 1 || monthNum! > 12)) {
        res.status(400).json({ message: 'Month must be between 1 and 12' });
        return;
      }

      const incomes = await this.incomeService.getIncomesByDateRange(
        req.user.id,
        yearNum,
        monthNum
      );

      res.json({
        data: incomes,
        meta: {
          year: yearNum,
          month: monthNum || null,
          count: incomes.length
        }
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  };
}

export default IncomeController;