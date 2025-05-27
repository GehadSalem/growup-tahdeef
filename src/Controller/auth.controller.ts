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
            response.status(400).json({ message: errorMessage });
        }
    };

    static login = async (request: Request, response: Response): Promise<void> => {
        try {
            const token = await this.authService.login(request.body.email, request.body.password);
            response.json({ token });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            response.status(401).json({ message: errorMessage });
        }
    };
    // NEW: Google Auth endpoint
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
        response.status(401).json({ message: errorMessage });
    }
};
}

export default AuthController;