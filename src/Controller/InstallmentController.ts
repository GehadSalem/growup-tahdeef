import { Request, Response } from 'express';
import { Installment } from '../entities/Installment';
import { AppDataSource } from '../dbConfig/data-source';

export class InstallmentController {
    static deletePlan(deletePlan: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
      throw new Error('Method not implemented.');
    }
    static getPlans(getPlans: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
      throw new Error('Method not implemented.');
    }
    static addPlan(addPlan: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
      throw new Error('Method not implemented.');
    }
    static markInstallmentPaid(markInstallmentPaid: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
      throw new Error('Method not implemented.');
    }
    static getInstallments(getInstallments: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
      throw new Error('Method not implemented.');
    }
    static addInstallment(addInstallment: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
      throw new Error('Method not implemented.');
    }
    private installmentRepository = AppDataSource.getRepository(Installment);

    // Create a new installment
    async create(req: Request, res: Response) {
        try {
            const newInstallment = this.installmentRepository.create(req.body);
            await this.installmentRepository.save(newInstallment);
            res.status(201).json(newInstallment);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Get all installments
    async getAll(req: Request, res: Response) {
        try {
            const installments = await this.installmentRepository.find({ relations: ['user'] });
            res.json(installments);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Get installment by ID
    async getById(req: Request, res: Response) {
        try {
            const installment = await this.installmentRepository.findOne({ 
                where: { id: req.params.id },
                relations: ['user']
            });
            if (!installment) return res.status(404).json({ message: 'Installment not found' });
            res.json(installment);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Update installment
    async update(req: Request, res: Response) {
        try {
            const installment = await this.installmentRepository.findOneBy({ id: req.params.id });
            if (!installment) return res.status(404).json({ message: 'Installment not found' });
            
            this.installmentRepository.merge(installment, req.body);
            const updatedInstallment = await this.installmentRepository.save(installment);
            res.json(updatedInstallment);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Delete installment
    async delete(req: Request, res: Response) {
        try {
            const result = await this.installmentRepository.delete(req.params.id);
            if (result.affected === 0) return res.status(404).json({ message: 'Installment not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Get installments by user ID
    async getByUserId(req: Request, res: Response) {
        try {
            const installments = await this.installmentRepository.find({ 
                where: { user: { id: req.params.userId } },
                relations: ['user']
            });
            res.json(installments);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Get installments by status
    async getByStatus(req: Request, res: Response) {
        try {
            const installments = await this.installmentRepository.find({ 
                where: { status: req.params.status },
                relations: ['user']
            });
            res.json(installments);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}