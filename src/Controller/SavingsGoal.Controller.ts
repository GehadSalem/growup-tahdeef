import { Request, Response } from 'express';
import { SavingsGoalService } from '../Services/SavingsGoal.Service';
import { UserService } from '../Services/UserService';

export class SavingsGoalController {
  static addToSavingsGoal: Function;
  static deleteSavingsGoal(deleteSavingsGoal: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Method not implemented.');
  }
  static getSavingsGoalById(getSavingsGoalById: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Method not implemented.');
  }
  static getUserSavingsGoals(getUserSavingsGoals: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Method not implemented.');
  }
  static createSavingsGoal(createSavingsGoal: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Method not implemented.');
  }
  private savingsGoalService = new SavingsGoalService();
  private userService = new UserService();

  async createSavingsGoal(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.user.id);
      const newGoal = await this.savingsGoalService.createSavingsGoal(user, req.body);
      res.status(201).json(newGoal);
    } catch (error) {
      res.status(500).json({ message: (error instanceof Error) ? error.message : 'An unknown error occurred' });
    }
  }

  async getUserSavingsGoals(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(400).json({ message: 'User information is missing in the request' });
      }
      const goals = await this.savingsGoalService.getUserSavingsGoals(req.user.id);
      res.json(goals);
    } catch (error) {
      res.status(500).json({ message: (error instanceof Error) ? error.message : 'An unknown error occurred' });
    }
  }

  async updateSavingsGoal(req: Request, res: Response) {
    try {
      const updatedGoal = await this.savingsGoalService.updateSavingsGoal(req.params.id, req.body);
      res.json(updatedGoal);
    } catch (error) {
      res.status(500).json({ message: (error instanceof Error) ? error.message : 'An unknown error occurred' });
    }
  }

  async deleteSavingsGoal(req: Request, res: Response) {
    try {
      await this.savingsGoalService.deleteSavingsGoal(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: (error instanceof Error) ? error.message : 'An unknown error occurred' });
    }
  }

  async addToSavingsGoal(req: Request, res: Response) {
    try {
      const { amount } = req.body;
      const updatedGoal = await this.savingsGoalService.addToSavingsGoal(req.params.id, amount);
      res.json(updatedGoal);
    } catch (error) {
      res.status(500).json({ message: (error instanceof Error) ? error.message : 'An unknown error occurred' });
    }
  }
}