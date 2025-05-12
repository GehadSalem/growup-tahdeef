import { Request, Response } from 'express';
import { GoalService } from '../Services/goal.service';
import { NotificationService } from '../Services/notification.service';
import { User } from '../entities/User';

class GoalController {
    private static goalService = new GoalService();
    private static notificationService = new NotificationService();

    static addGoal = async (request: Request, response: Response): Promise<void> => {
        try {
            if (!request.user) {
                response.status(401).json({ message: 'Unauthorized' });
                return;
            }
            const goal = await this.goalService.createGoal(
                request.user?.id,
                request.body
            );
            response.status(201).json(goal);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            response.status(400).json({ message: errorMessage });
        }
    };

    static getGoals = async (request: Request, response: Response): Promise<void> => {
        try {
            if (!request.user) {
                response.status(401).json({ message: 'Unauthorized' });
                return;
            }
            const goals = await this.goalService.getUserGoals(request.user?.id);
            response.json(goals);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            response.status(500).json({ message: errorMessage });
        }
    };

    static contributeToGoal = async (request: Request, response: Response): Promise<void> => {
        try {
            const { amount } = request.body;
            if (!request.user) {
                response.status(401).json({ message: 'Unauthorized' });
                return;
            }
    
            const goalId = parseInt(request.params?.id, 10);
    
            if (isNaN(goalId)) {
                response.status(400).json({ message: 'Invalid goal ID' });
                return;
            }
    
            const goal = await this.goalService.contributeToGoal(
                goalId,
                request.user?.id,
                amount
            );
    
            if (goal.achieved) {
                await this.notificationService.sendNotification(
                    request.user as User,
                    "تهانينا!",
                    `لقد حققت هدفك ${goal.name}!`
                );
            }
    
            response.json(goal);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            response.status(400).json({ message: errorMessage });
        }
    };
}

export default GoalController;