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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var notification_service_1 = require("../Services/notification.service.js");
require("../types/express");
var NotificationController = /** @class */ (function () {
    function NotificationController() {
    }
    var _a;
    _a = NotificationController;
    NotificationController.notificationService = new notification_service_1.NotificationService();
    NotificationController.updateToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var token, user, error_1, message;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    token = req.body.token;
                    if (!token) {
                        res.status(400).json({ message: "Token is required" });
                        return [2 /*return*/];
                    }
                    user = req.user;
                    return [4 /*yield*/, this.notificationService.updateUserToken(user.id, token)];
                case 1:
                    _b.sent();
                    res.json({ message: "تم تحديث رمز الإشعارات بنجاح" });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    message = error_1 instanceof Error ? error_1.message : "Unknown error";
                    res.status(400).json({ message: message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    NotificationController.testNotification = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2, message;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, this.notificationService.sendNotification(req.user, "اختبار إشعار", "هذا إشعار تجريبي من التطبيق")];
                case 1:
                    _b.sent();
                    res.json({ message: "تم إرسال الإشعار التجريبي" });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    message = error_2 instanceof Error ? error_2.message : "Unknown error";
                    res.status(400).json({ message: message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    NotificationController.markNotificationRead = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var notificationId, user, error_3, message;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    notificationId = req.body.notificationId;
                    user = req.user;
                    if (!notificationId) {
                        res.status(400).json({ message: "Notification ID is required" });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.notificationService.markAsRead(user.id, notificationId)];
                case 1:
                    _b.sent();
                    res.json({ message: "تم تعليم الإشعار كمقروء" });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _b.sent();
                    message = error_3 instanceof Error ? error_3.message : "Unknown error";
                    res.status(400).json({ message: message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return NotificationController;
}());
exports.default = NotificationController;
//# sourceMappingURL=notification.controller.js.map