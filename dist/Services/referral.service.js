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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralService = void 0;
// src/services/referral.service.ts
var users_service_1 = require("../Services/users.service");
var ReferralService = /** @class */ (function () {
    function ReferralService() {
        this.userService = new users_service_1.UserService();
    }
    ReferralService.prototype.generateReferralCode = function (length) {
        if (length === void 0) { length = 6; }
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({ length: length }, function () { return chars[Math.floor(Math.random() * chars.length)]; }).join('');
    };
    ReferralService.prototype.registerUser = function (name, email, password, referredByCode) {
        return __awaiter(this, void 0, void 0, function () {
            var referralCode, referredByUser, _a, newUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        referralCode = this.generateReferralCode();
                        if (!referredByCode) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userService.findByReferralCode(referredByCode)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = null;
                        _b.label = 3;
                    case 3:
                        referredByUser = _a;
                        return [4 /*yield*/, this.userService.createUser({
                                name: name,
                                email: email,
                                password: password,
                                referralCode: referralCode,
                                referredBy: referredByUser ? referredByUser.referralCode : undefined,
                            })];
                    case 4:
                        newUser = _b.sent();
                        return [2 /*return*/, newUser];
                }
            });
        });
    };
    ReferralService.prototype.getReferrals = function (referralCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findReferrals(referralCode)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ReferralService;
}());
exports.ReferralService = ReferralService;
//# sourceMappingURL=referral.service.js.map