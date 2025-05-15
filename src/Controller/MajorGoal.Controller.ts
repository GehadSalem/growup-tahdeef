import { Request, Response } from 'express';
import { MajorGoalService } from '../Services/MajorGoalService';
import { UserService } from '../Services/UserService';

export class MajorGoalController {
  static linkSavingsGoal(linkSavingsGoal: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Method not implemented.');
  }
  static updateProgress(updateProgress: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Method not implemented.');
  }
  static deleteMajorGoal(deleteMajorGoal: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Method not implemented.');
  }
  static updateMajorGoal(updateMajorGoal: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Method not implemented.');
  }
  static getMajorGoalById(getMajorGoalById: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Method not implemented.');
  }
  static getUserMajorGoals(getUserMajorGoals: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Method not implemented.');
  }
  static createMajorGoal(createMajorGoal: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Method not implemented.');
  }
  private majorGoalService = new MajorGoalService();
  private userService = new UserService();

  async createMajorGoal(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(400).json({ message: 'User information is missing in the request.' });
      }
      const user = await this.userService.getUserById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      const newGoal = await this.majorGoalService.createMajorGoal(user, req.body);
      res.status(201).json(newGoal);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  }

  async getUserMajorGoals(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(400).json({ message: 'User information is missing in the request.' });
      }
      const goals = await this.majorGoalService.getUserMajorGoals(req.user.id);
      res.json(goals);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  }

  async updateMajorGoal(req: Request, res: Response) {
    try {
      const updatedGoal = await this.majorGoalService.updateMajorGoal(req.params.id, req.body);
      res.json(updatedGoal);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  }

  async deleteMajorGoal(req: Request, res: Response) {
    try {
      await this.majorGoalService.deleteMajorGoal(req.params.id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  }

  async updateProgress(req: Request, res: Response) {
    try {
      const { progress } = req.body;
      const updatedGoal = await this.majorGoalService.updateProgress(req.params.id, progress);
      res.json(updatedGoal);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  }
}