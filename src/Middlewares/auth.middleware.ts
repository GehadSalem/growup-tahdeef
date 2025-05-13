import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';


export async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      // 1. Check authorization header exists
      const { authorization } = req.headers;
      console.log('Authentication started');
      console.log('Received headers:', req.headers);
      console.log('Auth header:', { authorization });

      if (!authorization) {
        return res.status(400).json({ 
          message: 'Authorization header is required' 
        });
      }

      // 2. Check Bearer token format
      const [prefix, token] = authorization.split('__'); // Using your custom separator
      
      if (!prefix || !token) {
        return res.status(400).json({ 
          message: 'Invalid authorization format.' 
        });
      }

      // 3. Verify token prefix matches expected
      if (prefix !== process.env.TOKEN_PREFIX) { // Add TOKEN_PREFIX to your .env
        return res.status(400).json({ 
          message: 'Invalid token prefix' 
        });
      }

      // 4. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as unknown as { id: string, iat: string };
      
      if (!decoded?.id) {
        return res.status(400).json({ 
          message: 'Invalid token payload' 
        });
      }

      // 5. Find user in database
      const userRepository = new UserRepository();
      const user = await userRepository.findById(decoded?.id);
      
      if (!user) {
        return res.status(401).json({ 
          message: 'User not found' 
        });
      }

      // Attach user to request and proceed
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ 
          message: 'Token expired, please login again' 
        });
      }
      
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ 
          message: 'Invalid authentication token' 
        });
      }

      console.error('Authentication error:', error);
      return res.status(500).json({ 
        message: 'Authentication failed' 
      });
    }
};