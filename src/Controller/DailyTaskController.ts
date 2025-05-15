import { Request, Response } from 'express';
import { DailyTask } from '../entities/DailyTask';
import { AppDataSource } from '../dbConfig/data-source';

export class DailyTaskController {
    static deleteTask(deleteTask: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
      throw new Error('Method not implemented.');
    }
    static markTaskComplete(markTaskComplete: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
      throw new Error('Method not implemented.');
    }
    static getTasks(getTasks: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
      throw new Error('Method not implemented.');
    }
    static addTask(addTask: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
      throw new Error('Method not implemented.');
    }
    private dailyTaskRepository = AppDataSource.getRepository(DailyTask);

    // Create a new daily task
    async create(req: Request, res: Response) {
        try {
            const newTask = this.dailyTaskRepository.create(req.body);
            await this.dailyTaskRepository.save(newTask);
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Get all daily tasks
    async getAll(req: Request, res: Response) {
        try {
            const tasks = await this.dailyTaskRepository.find();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Get daily task by ID
    async getById(req: Request, res: Response) {
        try {
            const task = await this.dailyTaskRepository.findOneBy({ id: req.params.id });
            if (!task) return res.status(404).json({ message: 'Task not found' });
            res.json(task);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Update daily task
    async update(req: Request, res: Response) {
        try {
            const task = await this.dailyTaskRepository.findOneBy({ id: req.params.id });
            if (!task) return res.status(404).json({ message: 'Task not found' });
            
            this.dailyTaskRepository.merge(task, req.body);
            const updatedTask = await this.dailyTaskRepository.save(task);
            res.json(updatedTask);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Delete daily task
    async delete(req: Request, res: Response) {
        try {
            const result = await this.dailyTaskRepository.delete(req.params.id);
            if (result.affected === 0) return res.status(404).json({ message: 'Task not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Get tasks by user ID
    async getByUserId(req: Request, res: Response) {
        try {
            const tasks = await this.dailyTaskRepository.find({ where: { userId: req.params.userId } });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}