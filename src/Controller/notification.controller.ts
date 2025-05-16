// src/Controllers/NotificationController.ts
import { Request, Response } from 'express';
import { NotificationService } from '../Services/notification.service';
import { User } from '../entities/User';
import '../types/express';

class NotificationController {
  private static notificationService = new NotificationService();

  // ✅ تحديث رمز الإشعارات
  static updateToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({ message: "Token is required" });
      return;
    }

    const user = req.user as User;
    await this.notificationService.updateUserToken(user.id, token);

    res.json({ message: "تم تحديث رمز الإشعارات بنجاح" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).json({ message: errorMessage });
  }
};


  // ✅ إرسال إشعار تجريبي
  static testNotification = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.notificationService.sendNotification(
        req.user as User,
        "اختبار إشعار",
        "هذا إشعار تجريبي من التطبيق"
      );

      res.json({ message: "تم إرسال الإشعار التجريبي" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(400).json({ message: errorMessage });
    }
  };

  // ✅ تعليم الإشعار كمقروء
  static markNotificationRead = async (req: Request, res: Response): Promise<void> => {
    try {
      const { notificationId } = req.body;
      const user = req.user as User;

      if (!notificationId) {
        res.status(400).json({ message: "Notification ID is required" });
        return;
      }

      await this.notificationService.markAsRead(user.id, notificationId);

      res.json({ message: "تم تعليم الإشعار كمقروء" });
      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(400).json({ message: errorMessage });
      return;
    }
  };
}

export default NotificationController;
