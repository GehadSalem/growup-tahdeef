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
exports.authenticate = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user.repository");
require("../types/express");
function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Skip auth for public routes (register/login)
        const publicRoutes = ['/api/auth/register', '/api/auth/login'];
        if (publicRoutes.includes(req.path)) {
            return next(); // Skip authentication
        }
        try {
            const { authorization } = req.headers;
            console.log('Authentication started');
            console.log('Received headers:', req.headers);
            console.log('Auth header:', { authorization });
            if (!authorization) {
                return res.status(400).json({
                    message: 'Authorization header is required'
                });
            }
            const [prefix, token] = authorization.split('__');
            if (!prefix || !token) {
                return res.status(400).json({
                    message: 'Invalid authorization format.'
                });
            }
            if (prefix !== process.env.TOKEN_PREFIX) {
                return res.status(400).json({
                    message: 'Invalid token prefix'
                });
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            if (!(decoded === null || decoded === void 0 ? void 0 : decoded.id)) {
                return res.status(400).json({
                    message: 'Invalid token payload'
                });
            }
            const userRepository = new user_repository_1.UserRepository();
            const user = yield userRepository.findById(decoded === null || decoded === void 0 ? void 0 : decoded.id);
            if (!user) {
                return res.status(401).json({
                    message: 'User not found'
                });
            }
            req.user = user;
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                return res.status(401).json({
                    message: 'Token expired, please login again'
                });
            }
            if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                return res.status(401).json({
                    message: 'Invalid authentication token'
                });
            }
            console.error('Authentication error:', error);
            return res.status(500).json({
                message: 'Authentication failed'
            });
        }
    });
}
;
