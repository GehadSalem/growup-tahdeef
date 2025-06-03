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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_repository_1 = require("../repositories/user.repository.js");
require("../types/express.js");
function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var publicRoutes, authorization, _a, prefix, token, decoded, userRepository, user, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    publicRoutes = ['/api/auth/register', '/api/auth/login'];
                    if (publicRoutes.includes(req.path)) {
                        return [2 /*return*/, next()]; // Skip authentication
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    authorization = req.headers.authorization;
                    console.log('Authentication started');
                    console.log('Received headers:', req.headers);
                    console.log('Auth header:', { authorization: authorization });
                    if (!authorization) {
                        return [2 /*return*/, res.status(400).json({
                                message: 'Authorization header is required'
                            })];
                    }
                    _a = authorization.split('__'), prefix = _a[0], token = _a[1];
                    if (!prefix || !token) {
                        return [2 /*return*/, res.status(400).json({
                                message: 'Invalid authorization format.'
                            })];
                    }
                    if (prefix !== process.env.TOKEN_PREFIX) {
                        return [2 /*return*/, res.status(400).json({
                                message: 'Invalid token prefix'
                            })];
                    }
                    decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
                    if (!(decoded === null || decoded === void 0 ? void 0 : decoded.id)) {
                        return [2 /*return*/, res.status(400).json({
                                message: 'Invalid token payload'
                            })];
                    }
                    userRepository = new user_repository_1.UserRepository();
                    return [4 /*yield*/, userRepository.findById(decoded === null || decoded === void 0 ? void 0 : decoded.id)];
                case 2:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(401).json({
                                message: 'User not found'
                            })];
                    }
                    req.user = user;
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    if (error_1 instanceof jsonwebtoken_1.default.TokenExpiredError) {
                        return [2 /*return*/, res.status(401).json({
                                message: 'Token expired, please login again'
                            })];
                    }
                    if (error_1 instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                        return [2 /*return*/, res.status(401).json({
                                message: 'Invalid authentication token'
                            })];
                    }
                    console.error('Authentication error:', error_1);
                    return [2 /*return*/, res.status(500).json({
                            message: 'Authentication failed'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
//# sourceMappingURL=auth.middleware.js.map