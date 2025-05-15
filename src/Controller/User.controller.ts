import { Request, Response } from "express";
import { UserService } from "../Services/User.service";

export class UserController {
    private userService = new UserService();

    async register(req: Request, res: Response) {
        try {
            const { user, token } = await this.userService.register(req.body);
            
            await this.userService.setupDefaultHabits(user.id);
            
            res.status(201).json({ user, token });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(400).json({ message: errorMessage });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const { user, token } = await this.userService.login(email, password);
            res.json({ user, token });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(401).json({ message: errorMessage });
        }
    }

    async updateIncome(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(400).json({ message: "User information is missing in the request." });
            }
            const user = await this.userService.updateMonthlyIncome(
                req.user.id, 
                req.body.monthlyIncome
            );
            res.json(user);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(400).json({ message: errorMessage });
        }
    }

    async getFinancialOverview(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(400).json({ message: "User information is missing in the request." });
            }
            const overview = await this.userService.getFinancialOverview(req.user.id);
            res.json(overview);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            res.status(400).json({ message: errorMessage });
        }
    }
}