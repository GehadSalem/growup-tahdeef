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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingsGoalService = void 0;
var data_source_1 = require("../dbConfig/data-source");
var SavingsGoal_entity_1 = require("../entities/SavingsGoal.entity");
var SavingsGoalService = /** @class */ (function () {
    function SavingsGoalService() {
        this.savingsGoalRepository = data_source_1.AppDataSource.getRepository(SavingsGoal_entity_1.SavingsGoal);
    }
    SavingsGoalService.prototype.createSavingsGoal = function (user, goalData) {
        return __awaiter(this, void 0, void 0, function () {
            var newGoal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newGoal = this.savingsGoalRepository.create(__assign(__assign({}, goalData), { user: user }));
                        return [4 /*yield*/, this.savingsGoalRepository.save(newGoal)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SavingsGoalService.prototype.getUserSavingsGoals = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.savingsGoalRepository.find({
                            where: { user: { id: userId } },
                            relations: ['user']
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SavingsGoalService.prototype.getSavingsGoalById = function (goalId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.savingsGoalRepository.findOne({
                            where: { id: goalId },
                            relations: ['user'], // so you can check the owner in controller
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SavingsGoalService.prototype.updateSavingsGoal = function (goalId, updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var goal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.savingsGoalRepository.findOneBy({ id: goalId })];
                    case 1:
                        goal = _a.sent();
                        if (!goal)
                            throw new Error('Savings goal not found');
                        Object.assign(goal, updateData);
                        return [4 /*yield*/, this.savingsGoalRepository.save(goal)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SavingsGoalService.prototype.deleteSavingsGoal = function (goalId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.savingsGoalRepository.delete(goalId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SavingsGoalService.prototype.addToSavingsGoal = function (goalId, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var goal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.savingsGoalRepository.findOneBy({ id: goalId })];
                    case 1:
                        goal = _a.sent();
                        if (!goal)
                            throw new Error('Savings goal not found');
                        goal.currentAmount += amount;
                        if (goal.currentAmount >= goal.targetAmount) {
                            goal.status = 'completed';
                        }
                        return [4 /*yield*/, this.savingsGoalRepository.save(goal)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return SavingsGoalService;
}());
exports.SavingsGoalService = SavingsGoalService;
//# sourceMappingURL=savingsGoals.service.js.map