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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const axios_1 = __importDefault(require("axios"));
class NotificationService {
    sendNotification(user, title, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.notificationToken) {
                console.warn('لا يوجد رمز إشعار للمستخدم');
                return;
            }
            try {
                yield axios_1.default.post('https://fcm.googleapis.com/fcm/send', {
                    to: user.notificationToken,
                    notification: {
                        title,
                        body: message,
                        sound: 'default'
                    },
                    priority: 'high'
                }, {
                    headers: {
                        'Authorization': `key=${process.env.FCM_SERVER_KEY}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('فشل إرسال الإشعار:', error.message);
                }
                else {
                    console.error('فشل إرسال الإشعار:', error);
                }
                throw new Error('فشل إرسال الإشعار');
            }
        });
    }
    sendReminder(user, habitName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendNotification(user, 'تذكير', `لا تنسى تنفيذ عادة ${habitName} اليوم!`);
        });
    }
}
exports.NotificationService = NotificationService;
