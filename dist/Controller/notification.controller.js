"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const notification_service_1 = require("../Services/notification.service");
require("../types/express");
class NotificationController {
}
_a = NotificationController;
NotificationController.notificationService = new notification_service_1.NotificationService();
NotificationController.updateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        if (!token) {
            res.status(400).json({ message: "Token is required" });
            return;
        }
        const user = req.user;
        yield _a.notificationService.updateUserToken(user.id, token);
        res.json({ message: "تم تحديث رمز الإشعارات بنجاح" });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(400).json({ message });
    }
});
NotificationController.testNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _a.notificationService.sendNotification(req.user, "اختبار إشعار", "هذا إشعار تجريبي من التطبيق");
        res.json({ message: "تم إرسال الإشعار التجريبي" });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(400).json({ message });
    }
});
NotificationController.markNotificationRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notificationId } = req.body;
        const user = req.user;
        if (!notificationId) {
            res.status(400).json({ message: "Notification ID is required" });
            return;
        }
        yield _a.notificationService.markAsRead(user.id, notificationId);
        res.json({ message: "تم تعليم الإشعار كمقروء" });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(400).json({ message });
    }
});
exports.default = NotificationController;
