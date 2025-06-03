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
exports.ReportService = void 0;
var expense_service_1 = require("./expense.service.js");
var majorGoal_service_1 = require("./majorGoal.service.js");
var savingsGoals_service_1 = require("./savingsGoals.service.js");
var ReportService = /** @class */ (function () {
    function ReportService() {
        this.expenseService = new expense_service_1.ExpenseService();
        this.majorGoalService = new majorGoal_service_1.MajorGoalService();
        this.savingsGoalService = new savingsGoals_service_1.SavingsGoalService();
    }
    ReportService.prototype.generateFinancialReport = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var monthlyExpenses, savingsGoals, majorGoals, totalExpenses, totalSavingsNeeded, emergencyFund, emergencyFundAmount, totalSavingsExcludingEmergency;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.expenseService.getUserExpenses(userId)];
                    case 1:
                        monthlyExpenses = _a.sent();
                        return [4 /*yield*/, this.savingsGoalService.getUserSavingsGoals(userId)];
                    case 2:
                        savingsGoals = _a.sent();
                        return [4 /*yield*/, this.majorGoalService.getUserMajorGoals(userId)];
                    case 3:
                        majorGoals = _a.sent();
                        totalExpenses = monthlyExpenses.reduce(function (sum, exp) { return sum + exp.amount; }, 0);
                        totalSavingsNeeded = savingsGoals.reduce(function (sum, goal) { return sum + (goal.targetAmount - goal.currentAmount); }, 0);
                        emergencyFund = savingsGoals.find(function (g) { return g.isEmergencyFund; });
                        emergencyFundAmount = (emergencyFund === null || emergencyFund === void 0 ? void 0 : emergencyFund.currentAmount) || 0;
                        totalSavingsExcludingEmergency = savingsGoals
                            .filter(function (g) { return !g.isEmergencyFund; })
                            .reduce(function (sum, goal) { return sum + (goal.targetAmount - goal.currentAmount); }, 0);
                        return [2 /*return*/, {
                                totalExpenses: totalExpenses,
                                totalSavingsNeeded: totalSavingsNeeded,
                                emergencyFund: {
                                    saved: (emergencyFund === null || emergencyFund === void 0 ? void 0 : emergencyFund.currentAmount) || 0,
                                    target: (emergencyFund === null || emergencyFund === void 0 ? void 0 : emergencyFund.targetAmount) || 0,
                                    progress: emergencyFund
                                        ? (emergencyFund.currentAmount / emergencyFund.targetAmount) * 100
                                        : 0
                                },
                                majorGoals: majorGoals.map(function (goal) { return ({
                                    id: goal.id,
                                    name: goal.title,
                                    progress: goal.progress,
                                    status: goal.status
                                }); })
                            }];
                }
            });
        });
    };
    return ReportService;
}());
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map