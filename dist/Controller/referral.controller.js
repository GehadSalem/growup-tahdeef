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
exports.getReferrals = exports.register = void 0;
const referral_service_1 = require("../Services/referral.service");
const referralService = new referral_service_1.ReferralService();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, referredBy } = req.body;
        const user = yield referralService.registerUser(name, email, password, referredBy);
        res.status(201).json({ message: 'User registered successfully', referralCode: user.referralCode });
    }
    catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});
exports.register = register;
const getReferrals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { referralCode } = req.params;
        const referrals = yield referralService.getReferrals(referralCode);
        res.status(200).json(referrals);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve referrals' });
    }
});
exports.getReferrals = getReferrals;
