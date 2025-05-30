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
const auth_service_1 = require("../Services/auth.service");
class AuthController {
}
_a = AuthController;
AuthController.authService = new auth_service_1.AuthService();
AuthController.register = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield _a.authService.register(request.body);
        response.status(201).json(user);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        response.status(400).json({
            message: errorMessage,
            errorType: 'registration_error' // إضافة نوع الخطأ
        });
    }
});
AuthController.login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield _a.authService.login(request.body.email, request.body.password);
        response.json({ token });
    }
    catch (error) {
        let errorMessage = 'An unknown error occurred';
        let errorType = 'authentication_error';
        if (error instanceof Error) {
            errorMessage = error.message;
            // تحديد نوع الخطأ بناءً على الرسالة
            if (error.message.includes('User not found')) {
                errorType = 'user_not_found';
                errorMessage = 'لا يوجد حساب مرتبط بهذا البريد الإلكتروني';
            }
            else if (error.message.includes('Invalid password')) {
                errorType = 'invalid_password';
                errorMessage = 'كلمة المرور غير صحيحة';
            }
        }
        response.status(401).json({
            message: errorMessage,
            errorType: errorType
        });
    }
});
AuthController.googleAuth = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idToken } = request.body;
        if (!idToken || typeof idToken !== 'string') {
            throw new Error('Valid ID token is required');
        }
        const token = yield _a.authService.verifyGoogleToken(idToken);
        response.json({ token });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Google authentication failed';
        response.status(401).json({
            message: errorMessage,
            errorType: 'google_auth_error'
        });
    }
});
exports.default = AuthController;
