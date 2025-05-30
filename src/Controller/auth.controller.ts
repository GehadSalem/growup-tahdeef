import { Request, Response } from 'express';
import { AuthService } from '../Services/auth.service';

class AuthController {
    private static authService = new AuthService();

    static register = async (request: Request, response: Response): Promise<void> => {
        try {
            const user = await this.authService.register(request.body);
            response.status(201).json(user);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            response.status(400).json({ 
                message: errorMessage,
                errorType: 'registration_error' // إضافة نوع الخطأ
            });
        }
    };

    static login = async (request: Request, response: Response): Promise<void> => {
        try {
            const token = await this.authService.login(request.body.email, request.body.password);
            response.json({ token });
        } catch (error) {
            let errorMessage = 'An unknown error occurred';
            let errorType = 'authentication_error';
            
            if (error instanceof Error) {
                errorMessage = error.message;
                
                // تحديد نوع الخطأ بناءً على الرسالة
                if (error.message.includes('User not found')) {
                    errorType = 'user_not_found';
                    errorMessage = 'لا يوجد حساب مرتبط بهذا البريد الإلكتروني';
                } else if (error.message.includes('Invalid password')) {
                    errorType = 'invalid_password';
                    errorMessage = 'كلمة المرور غير صحيحة';
                }
            }
            
            response.status(401).json({ 
                message: errorMessage,
                errorType: errorType
            });
        }
    };

    static googleAuth = async (request: Request, response: Response): Promise<void> => {
        try {
            const { idToken } = request.body;
            if (!idToken || typeof idToken !== 'string') {
                throw new Error('Valid ID token is required');
            }
            
            const token = await this.authService.verifyGoogleToken(idToken);
            response.json({ token });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Google authentication failed';
            response.status(401).json({ 
                message: errorMessage,
                errorType: 'google_auth_error'
            });
        }
    };
}

export default AuthController;