import { Request, Response } from 'express';
import { Installment } from '../entities/Installment';
import '../types/express';
import { InstallmentService } from '../Services/installment.service';
import { UserService } from '../Services/users.service';

export class InstallmentController {
  private static service = new InstallmentService();
  private static userService = new UserService();

  static addInstallment = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'User information missing' });
        return;
      }

      const user = await this.userService.getUserById(req.user.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const installment = new Installment();
      Object.assign(installment, req.body);
      installment.user = user;

      const created = await this.service.createInstallment(installment);
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  static getUserInstallments = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'User information missing' });
        return;
      }

      const user = await this.userService.getUserById(req.user.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const installments = await this.service.getUserInstallments(user);
      res.json(installments);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  static updateInstallment = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'User information missing' });
        return;
      }

      const user = await this.userService.getUserById(req.user.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const updated = await this.service.updateInstallment(req.params.id, req.body, user);
      if (!updated) {
        res.status(404).json({ message: 'Installment not found' });
        return;
      }

      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  static deleteInstallment = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'User information missing' });
        return;
      }

      const user = await this.userService.getUserById(req.user.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const success = await this.service.deleteInstallment(req.params.id, user);
      if (!success) {
        res.status(404).json({ message: 'Installment not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  static getInstallmentById = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'User information missing' });
        return;
      }

      const user = await this.userService.getUserById(req.user.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const installment = await this.service.getInstallmentById(req.params.id, user);
      if (!installment) {
        res.status(404).json({ message: 'Installment not found' });
        return;
      }

      res.json(installment);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  static markInstallmentPaid = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'User information missing' });
        return;
      }

      const user = await this.userService.getUserById(req.user.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const installment = await this.service.markInstallmentPaid(req.params.id, user);
      if (!installment) {
        res.status(404).json({ message: 'Installment not found' });
        return;
      }

      res.json(installment);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
  };
}