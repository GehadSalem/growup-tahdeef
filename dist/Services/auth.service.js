"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_repository_1 = require("../repositories/user.repository");
var firebase_admin_1 = __importDefault(require("../config/firebase-admin"));
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    AuthService.prototype.register = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var existingUser, hashedPassword, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Add validation for required fields
                        if (!userData.email || !userData.password) {
                            throw new Error('Email and password are required');
                        }
                        return [4 /*yield*/, this.userRepository.findByEmail(userData.email)];
                    case 1:
                        existingUser = _a.sent();
                        if (existingUser)
                            throw new Error('Email already in use');
                        return [4 /*yield*/, bcrypt_1.default.hash(userData.password, 10)];
                    case 2:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.userRepository.create(__assign(__assign({}, userData), { password: hashedPassword, authProvider: 'email' // Track auth provider
                             }))];
                    case 3:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isValid, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error('Invalid credentials');
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 2:
                        isValid = _a.sent();
                        if (!isValid)
                            throw new Error('Invalid credentials');
                        token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
                            expiresIn: '7d'
                        });
                        return [2 /*return*/, token];
                }
            });
        });
    };
    // NEW: Google Auth methods
    AuthService.prototype.verifyGoogleToken = function (idToken) {
        return __awaiter(this, void 0, void 0, function () {
            var decodedToken, email, name_1, uid, userName, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, firebase_admin_1.default.auth().verifyIdToken(idToken)];
                    case 1:
                        decodedToken = _a.sent();
                        // Validate required fields from the decoded token
                        if (!decodedToken.email) {
                            throw new Error('Google token is missing email');
                        }
                        email = decodedToken.email, name_1 = decodedToken.name, uid = decodedToken.uid;
                        userName = name_1 || 'User';
                        return [4 /*yield*/, this.userRepository.findByEmail(email)];
                    case 2:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userRepository.create({
                                email: email,
                                name: userName,
                                firebaseUid: uid,
                                authProvider: 'google'
                            })];
                    case 3:
                        // Create new user if doesn't exist
                        user = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        if (user.authProvider !== 'google') {
                            throw new Error('Email already registered with another method');
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/, this.generateJWT(user.id)];
                    case 6:
                        error_1 = _a.sent();
                        console.error('Google token verification error:', error_1);
                        throw new Error('Invalid Google token');
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.generateJWT = function (userId) {
        return jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '7d'
        });
    };
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map