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
exports.EmergencyService = void 0;
var emergency_repository_1 = require("../repositories/emergency.repository.js");
var user_repository_1 = require("../repositories/user.repository.js");
var EmergencyService = /** @class */ (function () {
    function EmergencyService(emergencyRepository, userRepository) {
        this.emergencyRepository = emergencyRepository || new emergency_repository_1.EmergencyRepository();
        this.userRepository = userRepository || new user_repository_1.UserRepository();
    }
    EmergencyService.prototype.addToFund = function (userId, amount, description) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Validate amount
                        if (typeof amount !== 'number' || amount <= 0) {
                            throw new Error('Amount must be a positive number');
                        }
                        return [4 /*yield*/, this.userRepository.findById(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('User not found');
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.emergencyRepository.createFund({
                                amount: amount,
                                description: description,
                                date: new Date(),
                                user: user
                            })];
                    case 3: 
                    // Create and save fund
                    return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error adding to emergency fund:', error_1);
                        throw new Error('Failed to add to emergency fund');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    EmergencyService.prototype.getUserFunds = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.emergencyRepository.findUserFunds(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Error fetching user funds:', error_2);
                        throw new Error('Failed to get user funds');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EmergencyService.prototype.calculateSuggestedAmount = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findById(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('المستخدم غير موجود');
                        }
                        if (!user.monthlyIncome || user.monthlyIncome <= 0) {
                            throw new Error('دخل المستخدم الشهري غير صالح');
                        }
                        return [2 /*return*/, Number((user.monthlyIncome * 0.7).toFixed(2))];
                }
            });
        });
    };
    EmergencyService.prototype.getTotalEmergencyFund = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var funds, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getUserFunds(userId)];
                    case 1:
                        funds = _a.sent();
                        return [2 /*return*/, funds.reduce(function (total, fund) {
                                return total + fund.amount;
                            }, 0)];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Error calculating total emergency fund:', error_3);
                        throw new Error('حدث خطأ أثناء حساب إجمالي صندوق الطوارئ');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return EmergencyService;
}());
exports.EmergencyService = EmergencyService;
//# sourceMappingURL=emergency.service.js.map