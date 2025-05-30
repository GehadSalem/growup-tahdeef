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
exports.UserService = void 0;
const data_source_1 = require("../dbConfig/data-source");
const User_1 = require("../entities/User");
const SavingsGoal_1 = require("../entities/SavingsGoal");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    setupDefaultHabits(id) {
        throw new Error("Method not implemented.");
    }
    generateToken(userId) {
        return jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET || "your-strong-secret", { expiresIn: "30d" });
    }
    generateReferralCode(length = 6) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.userRepository.create(data);
            return yield this.userRepository.save(user);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOne({ where: { email } });
        });
    }
    findByReferralCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOne({ where: { referralCode: code } });
        });
    }
    findReferrals(referralCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.find({ where: { referredBy: referralCode } });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({
                    where: { id },
                    relations: ['savingsGoals']
                });
                return user;
            }
            catch (error) {
                throw new Error('Failed to fetch user');
            }
        });
    }
    updateMonthlyIncome(userId, newIncome) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({
                    where: { id: userId },
                    relations: ['savingsGoals']
                });
                if (!user)
                    throw new Error('المستخدم غير موجود');
                const emergencyFund = user.savingsGoals.find(g => g.isEmergencyFund);
                if (emergencyFund) {
                    emergencyFund.targetAmount = newIncome * 0.7;
                    yield data_source_1.AppDataSource.getRepository(SavingsGoal_1.SavingsGoal).save(emergencyFund);
                }
                user.monthlyIncome = newIncome;
                return yield this.userRepository.save(user);
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : 'Failed to update income');
            }
        });
    }
    getFinancialOverview(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({
                    where: { id: userId },
                    relations: ['savingsGoals']
                });
                if (!user)
                    throw new Error('المستخدم غير موجود');
                const emergencyFund = user.savingsGoals.find(g => g.isEmergencyFund);
                return {
                    monthlyIncome: user.monthlyIncome,
                    emergencyFund: {
                        target: (emergencyFund === null || emergencyFund === void 0 ? void 0 : emergencyFund.targetAmount) || 0,
                        saved: (emergencyFund === null || emergencyFund === void 0 ? void 0 : emergencyFund.currentAmount) || 0,
                        progress: emergencyFund ?
                            (emergencyFund.currentAmount / emergencyFund.targetAmount) * 100 : 0
                    },
                    activeGoals: user.savingsGoals.filter(g => !g.isEmergencyFund && g.status === 'active').length
                };
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : 'Failed to get financial overview');
            }
        });
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.userRepository.findOne({
                    where: { email: userData.email }
                });
                if (existingUser)
                    throw new Error('البريد الإلكتروني مسجل بالفعل');
                const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
                const emergencyFundTarget = userData.monthlyIncome * 0.7;
                const referralCode = this.generateReferralCode();
                const newUser = this.userRepository.create({
                    name: userData.name,
                    email: userData.email,
                    password: hashedPassword,
                    monthlyIncome: userData.monthlyIncome,
                    referralCode,
                    referredBy: userData.referredBy || undefined,
                    savingsGoals: [{
                            goalName: "صندوق الطوارئ",
                            targetAmount: emergencyFundTarget,
                            currentAmount: 0,
                            isEmergencyFund: true,
                            status: "active"
                        }]
                });
                yield this.userRepository.save(newUser);
                const token = this.generateToken(newUser.id);
                return { user: newUser, token };
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : 'Registration failed');
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({ where: { email } });
                if (!user)
                    throw new Error('المستخدم غير موجود');
                const isMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!isMatch)
                    throw new Error('كلمة المرور غير صحيحة');
                const token = this.generateToken(user.id);
                return { user, token };
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : 'Login failed');
            }
        });
    }
}
exports.UserService = UserService;
