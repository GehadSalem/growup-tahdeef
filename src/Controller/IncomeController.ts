import { Request, Response } from 'express';
import { Income } from '../entities/Income';
import { AppDataSource } from '../dbConfig/data-source';

export class IncomeController {
    static getMonthlyIncomes(getMonthlyIncomes: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
      throw new Error('Method not implemented.');
    }
    static getIncomes(getIncomes: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
      throw new Error('Method not implemented.');
    }
    static addIncome(addIncome: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
      throw new Error('Method not implemented.');
    }
    private incomeRepository = AppDataSource.getRepository(Income);

    // Create a new income record
    async create(req: Request, res: Response) {
        try {
            const newIncome = this.incomeRepository.create(req.body);
            await this.incomeRepository.save(newIncome);
            res.status(201).json(newIncome);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Get all income records
    async getAll(req: Request, res: Response) {
        try {
            const incomes = await this.incomeRepository.find({ relations: ['user'] });
            res.json(incomes);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Get income by ID
    async getById(req: Request, res: Response) {
        try {
            const income = await this.incomeRepository.findOne({ 
                where: { id: req.params.id },
                relations: ['user']
            });
            if (!income) return res.status(404).json({ message: 'Income not found' });
            res.json(income);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Update income record
    async update(req: Request, res: Response) {
        try {
            const income = await this.incomeRepository.findOneBy({ id: req.params.id });
            if (!income) return res.status(404).json({ message: 'Income not found' });
            
            this.incomeRepository.merge(income, req.body);
            const updatedIncome = await this.incomeRepository.save(income);
            res.json(updatedIncome);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Delete income record
    async delete(req: Request, res: Response) {
        try {
            const result = await this.incomeRepository.delete(req.params.id);
            if (result.affected === 0) return res.status(404).json({ message: 'Income not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Get incomes by user ID
    async getByUserId(req: Request, res: Response) {
        try {
            const incomes = await this.incomeRepository.find({ 
                where: { user: { id: req.params.userId } },
                relations: ['user']
            });
            res.json(incomes);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}