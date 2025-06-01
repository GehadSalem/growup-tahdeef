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
exports.ReferralService = void 0;
// src/services/referral.service.ts
const users_service_1 = require("../Services/users.service");
class ReferralService {
    constructor() {
        this.userService = new users_service_1.UserService();
    }
    generateReferralCode(length = 6) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }
    registerUser(name, email, password, referredByCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const referralCode = this.generateReferralCode();
            const referredByUser = referredByCode ? yield this.userService.findByReferralCode(referredByCode) : null;
            const newUser = yield this.userService.createUser({
                name,
                email,
                password,
                referralCode,
                referredBy: referredByUser ? referredByUser.referralCode : undefined,
            });
            return newUser;
        });
    }
    getReferrals(referralCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.findReferrals(referralCode);
        });
    }
}
exports.ReferralService = ReferralService;
