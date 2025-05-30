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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user.repository");
const firebase_admin_1 = __importDefault(require("../config/firebase-admin"));
class AuthService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Add validation for required fields
            if (!userData.email || !userData.password) {
                throw new Error('Email and password are required');
            }
            const existingUser = yield this.userRepository.findByEmail(userData.email);
            if (existingUser)
                throw new Error('Email already in use');
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
            const user = yield this.userRepository.create(Object.assign(Object.assign({}, userData), { password: hashedPassword, authProvider: 'email' // Track auth provider
             }));
            return user;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            if (!user)
                throw new Error('Invalid credentials');
            const isValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isValid)
                throw new Error('Invalid credentials');
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
                expiresIn: '7d'
            });
            return token;
        });
    }
    // NEW: Google Auth methods
    verifyGoogleToken(idToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedToken = yield firebase_admin_1.default.auth().verifyIdToken(idToken);
                // Validate required fields from the decoded token
                if (!decodedToken.email) {
                    throw new Error('Google token is missing email');
                }
                const { email, name, uid } = decodedToken;
                const userName = name || 'User'; // Provide default name if not available
                let user = yield this.userRepository.findByEmail(email);
                if (!user) {
                    // Create new user if doesn't exist
                    user = yield this.userRepository.create({
                        email,
                        name: userName,
                        firebaseUid: uid,
                        authProvider: 'google'
                    });
                }
                else if (user.authProvider !== 'google') {
                    throw new Error('Email already registered with another method');
                }
                return this.generateJWT(user.id);
            }
            catch (error) {
                console.error('Google token verification error:', error);
                throw new Error('Invalid Google token');
            }
        });
    }
    generateJWT(userId) {
        return jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '7d'
        });
    }
}
exports.AuthService = AuthService;
