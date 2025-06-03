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
exports.UserService = void 0;
var data_source_1 = require("../dbConfig/data-source");
var User_entity_1 = require("../entities/User.entity");
var SavingsGoal_entity_1 = require("../entities/SavingsGoal.entity");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var UserService = /** @class */ (function () {
    function UserService() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
    }
    UserService.prototype.setupDefaultHabits = function (id) {
        throw new Error("Method not implemented.");
    };
    UserService.prototype.generateToken = function (userId) {
        return jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET || "your-strong-secret", { expiresIn: "30d" });
    };
    UserService.prototype.generateReferralCode = function (length) {
        if (length === void 0) { length = 6; }
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({ length: length }, function () { return chars[Math.floor(Math.random() * chars.length)]; }).join('');
    };
    UserService.prototype.createUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.userRepository.create(data);
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { email: email } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.findByReferralCode = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { referralCode: code } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.findReferrals = function (referralCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.find({ where: { referredBy: referralCode } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: id },
                                relations: ['savingsGoals']
                            })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error('Failed to fetch user');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.updateMonthlyIncome = function (userId, newIncome) {
        return __awaiter(this, void 0, void 0, function () {
            var user, emergencyFund, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: userId },
                                relations: ['savingsGoals']
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error('المستخدم غير موجود');
                        emergencyFund = user.savingsGoals.find(function (g) { return g.isEmergencyFund; });
                        if (!emergencyFund) return [3 /*break*/, 3];
                        emergencyFund.targetAmount = newIncome * 0.7;
                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(SavingsGoal_entity_1.SavingsGoal).save(emergencyFund)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        user.monthlyIncome = newIncome;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        error_2 = _a.sent();
                        throw new Error(error_2 instanceof Error ? error_2.message : 'Failed to update income');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getFinancialOverview = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, emergencyFund, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: userId },
                                relations: ['savingsGoals']
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error('المستخدم غير موجود');
                        emergencyFund = user.savingsGoals.find(function (g) { return g.isEmergencyFund; });
                        return [2 /*return*/, {
                                monthlyIncome: user.monthlyIncome,
                                emergencyFund: {
                                    target: (emergencyFund === null || emergencyFund === void 0 ? void 0 : emergencyFund.targetAmount) || 0,
                                    saved: (emergencyFund === null || emergencyFund === void 0 ? void 0 : emergencyFund.currentAmount) || 0,
                                    progress: emergencyFund ?
                                        (emergencyFund.currentAmount / emergencyFund.targetAmount) * 100 : 0
                                },
                                activeGoals: user.savingsGoals.filter(function (g) { return !g.isEmergencyFund && g.status === 'active'; }).length
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error(error_3 instanceof Error ? error_3.message : 'Failed to get financial overview');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.register = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var existingUser, hashedPassword, emergencyFundTarget, referralCode, newUser, token, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { email: userData.email }
                            })];
                    case 1:
                        existingUser = _a.sent();
                        if (existingUser)
                            throw new Error('البريد الإلكتروني مسجل بالفعل');
                        return [4 /*yield*/, bcrypt_1.default.hash(userData.password, 10)];
                    case 2:
                        hashedPassword = _a.sent();
                        emergencyFundTarget = userData.monthlyIncome * 0.7;
                        referralCode = this.generateReferralCode();
                        newUser = this.userRepository.create({
                            name: userData.name,
                            email: userData.email,
                            password: hashedPassword,
                            monthlyIncome: userData.monthlyIncome,
                            referralCode: referralCode,
                            referredBy: userData.referredBy || undefined,
                            savingsGoals: [{
                                    goalName: "صندوق الطوارئ",
                                    targetAmount: emergencyFundTarget,
                                    currentAmount: 0,
                                    isEmergencyFund: true,
                                    status: "active"
                                }]
                        });
                        return [4 /*yield*/, this.userRepository.save(newUser)];
                    case 3:
                        _a.sent();
                        token = this.generateToken(newUser.id);
                        return [2 /*return*/, { user: newUser, token: token }];
                    case 4:
                        error_4 = _a.sent();
                        throw new Error(error_4 instanceof Error ? error_4.message : 'Registration failed');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isMatch, token, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.userRepository.findOne({ where: { email: email } })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error('المستخدم غير موجود');
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 2:
                        isMatch = _a.sent();
                        if (!isMatch)
                            throw new Error('كلمة المرور غير صحيحة');
                        token = this.generateToken(user.id);
                        return [2 /*return*/, { user: user, token: token }];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error(error_5 instanceof Error ? error_5.message : 'Login failed');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map