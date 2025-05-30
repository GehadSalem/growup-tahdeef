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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmergencyService = void 0;
const emergency_repository_1 = require("../repositories/emergency.repository");
const user_repository_1 = require("../repositories/user.repository");
class EmergencyService {
    constructor(emergencyRepository, userRepository) {
        this.emergencyRepository = emergencyRepository || new emergency_repository_1.EmergencyRepository();
        this.userRepository = userRepository || new user_repository_1.UserRepository();
    }
    addToFund(userId, amount, description) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate amount
            if (typeof amount !== 'number' || amount <= 0) {
                throw new Error('Amount must be a positive number');
            }
            // Find user with proper typing
            const user = yield this.userRepository.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            try {
                // Create and save fund
                return yield this.emergencyRepository.createFund({
                    amount,
                    description,
                    date: new Date(),
                    user
                });
            }
            catch (error) {
                console.error('Error adding to emergency fund:', error);
                throw new Error('Failed to add to emergency fund');
            }
        });
    }
    getUserFunds(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.emergencyRepository.findUserFunds(userId);
            }
            catch (error) {
                console.error('Error fetching user funds:', error);
                throw new Error('Failed to get user funds');
            }
        });
    }
    calculateSuggestedAmount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(userId);
            if (!user) {
                throw new Error('المستخدم غير موجود');
            }
            if (!user.monthlyIncome || user.monthlyIncome <= 0) {
                throw new Error('دخل المستخدم الشهري غير صالح');
            }
            return Number((user.monthlyIncome * 0.7).toFixed(2));
        });
    }
    getTotalEmergencyFund(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const funds = yield this.getUserFunds(userId);
                return funds.reduce((total, fund) => {
                    return total + fund.amount;
                }, 0);
            }
            catch (error) {
                console.error('Error calculating total emergency fund:', error);
                throw new Error('حدث خطأ أثناء حساب إجمالي صندوق الطوارئ');
            }
        });
    }
}
exports.EmergencyService = EmergencyService;
