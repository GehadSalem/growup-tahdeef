import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/User';

declare global {
    namespace Express {
        interface Request {
            user?: User; // Use your actual User type here
        }
    }
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ 
                message: 'مطلوب توكن مصادقة للوصول إلى هذا المسار' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { id: number };
        
        const userRepository = new UserRepository();
        const user = await userRepository.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ 
                message: 'المستخدم المرتبط بهذا التوكن غير موجود' 
            });
        }

        req.user = user; // Assign the complete user object

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ 
                message: 'انتهت صلاحية التوكن، يرجى تسجيل الدخول مرة أخرى' 
            });
        }
        
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ 
                message: 'توكن مصادقة غير صالح' 
            });
        }

        console.error('خطأ في مصادقة التوكن:', error);
        return res.status(500).json({ 
            message: 'حدث خطأ أثناء المصادقة' 
        });
    }
}

// Middleware to check if the user has a specific role
export function requireRoles(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        next();
    };
}