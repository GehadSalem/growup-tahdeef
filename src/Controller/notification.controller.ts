import { Request, Response } from 'express';
import { NotificationService } from '../Services/notification.service';
import { User } from '../entities/User';

class NotificationController {
    private static notificationService = new NotificationService();

    static updateToken = async (request: Request, response: Response): Promise<void> => {
        try {
            const { token } = request.body;
            // AuthController.updateProfile
            response.json({ message: "تم تحديث رمز الإشعارات بنجاح" });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            response.status(400).json({ message: errorMessage });
        }
    };

    static testNotification = async (request: Request, response: Response): Promise<void> => {
        try {
            await this.notificationService.sendNotification(
                request.user as User,
                "اختبار إشعار",
                "هذا إشعار تجريبي من التطبيق"
            );
            response.json({ message: "تم إرسال الإشعار التجريبي" });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            response.status(400).json({ message: errorMessage });
        }
    };
}

export default NotificationController;