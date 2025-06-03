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
exports.CustomInstallmentPlanController = void 0;
require("../types/express.js");
var customPlanInstallment_service_1 = require("../Services/customPlanInstallment.service.js");
var users_service_1 = require("../Services/users.service.js");
var CustomInstallmentPlan_entity_1 = require("../entities/CustomInstallmentPlan.entity.js");
var MajorGoal_entity_1 = require("../entities/MajorGoal.entity.js");
var data_source_1 = require("../dbConfig/data-source.js");
var CustomInstallmentPlanController = /** @class */ (function () {
    function CustomInstallmentPlanController() {
    }
    CustomInstallmentPlanController.calculateMonthlyPayment = function (principal, annualRate, months) {
        if (annualRate === 0)
            return principal / months;
        var monthlyRate = annualRate / 100 / 12;
        return principal * monthlyRate * Math.pow(1 + monthlyRate, months) /
            (Math.pow(1 + monthlyRate, months) - 1);
    };
    var _a;
    _a = CustomInstallmentPlanController;
    CustomInstallmentPlanController.service = new customPlanInstallment_service_1.CustomInstallmentPlanService();
    CustomInstallmentPlanController.userService = new users_service_1.UserService();
    CustomInstallmentPlanController.addPlan = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, productName, totalCost, downPayment, monthsCount, interestRate, linkedGoalId, plan, goal, savedPlan, error_1, errorMessage;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    _b = req.body, productName = _b.productName, totalCost = _b.totalCost, downPayment = _b.downPayment, monthsCount = _b.monthsCount, interestRate = _b.interestRate, linkedGoalId = _b.linkedGoalId;
                    // Basic validation
                    if (!productName || !totalCost || !monthsCount) {
                        res.status(400).json({ message: 'Missing required fields' });
                        return [2 /*return*/];
                    }
                    plan = new CustomInstallmentPlan_entity_1.CustomInstallmentPlan();
                    plan.productName = productName;
                    plan.totalCost = totalCost;
                    plan.downPayment = downPayment || 0;
                    plan.monthsCount = monthsCount;
                    plan.interestRate = interestRate || 0;
                    // Calculate monthly installment
                    plan.monthlyInstallment = this.calculateMonthlyPayment(totalCost - (downPayment || 0), interestRate || 0, monthsCount);
                    if (!linkedGoalId) return [3 /*break*/, 2];
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(MajorGoal_entity_1.MajorGoal).findOneBy({ id: linkedGoalId })];
                case 1:
                    goal = _c.sent();
                    if (!goal) {
                        res.status(404).json({ message: 'Linked goal not found' });
                        return [2 /*return*/];
                    }
                    plan.linkedGoal = goal;
                    _c.label = 2;
                case 2: return [4 /*yield*/, data_source_1.AppDataSource.getRepository(CustomInstallmentPlan_entity_1.CustomInstallmentPlan).save(plan)];
                case 3:
                    savedPlan = _c.sent();
                    res.status(201).json(savedPlan);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _c.sent();
                    errorMessage = error_1 instanceof Error ? error_1.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    CustomInstallmentPlanController.getPlans = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, plans, error_2, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information is missing.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.userService.getUserById(req.user.id)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        res.status(404).json({ message: 'User not found.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.service.getUserPlans(user)];
                case 2:
                    plans = _b.sent();
                    res.json(plans);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    errorMessage = error_2 instanceof Error ? error_2.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    CustomInstallmentPlanController.getPlanById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, plan, error_3, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information is missing.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.userService.getUserById(req.user.id)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        res.status(404).json({ message: 'User not found.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.service.getPlanById(req.params.id, user)];
                case 2:
                    plan = _b.sent();
                    if (!plan) {
                        res.status(404).json({ message: 'Plan not found.' });
                        return [2 /*return*/];
                    }
                    res.json(plan);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    errorMessage = error_3 instanceof Error ? error_3.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    CustomInstallmentPlanController.updatePlan = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, updatedPlan, error_4, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information is missing.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.userService.getUserById(req.user.id)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        res.status(404).json({ message: 'User not found.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.service.updatePlan(req.params.id, req.body, user)];
                case 2:
                    updatedPlan = _b.sent();
                    if (!updatedPlan) {
                        res.status(404).json({ message: 'Plan not found.' });
                        return [2 /*return*/];
                    }
                    res.json(updatedPlan);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _b.sent();
                    errorMessage = error_4 instanceof Error ? error_4.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    CustomInstallmentPlanController.deletePlan = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, success, error_5, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information is missing.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.userService.getUserById(req.user.id)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        res.status(404).json({ message: 'User not found.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.service.deletePlan(req.params.id, user)];
                case 2:
                    success = _b.sent();
                    if (!success) {
                        res.status(404).json({ message: 'Plan not found.' });
                        return [2 /*return*/];
                    }
                    res.status(204).send();
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _b.sent();
                    errorMessage = error_5 instanceof Error ? error_5.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Add this new method to get plans for a specific goal
    CustomInstallmentPlanController.getPlansForGoal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, goalId, goal, plans, error_6, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information is missing.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.userService.getUserById(req.user.id)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        res.status(404).json({ message: 'User not found.' });
                        return [2 /*return*/];
                    }
                    goalId = req.params.goalId;
                    return [4 /*yield*/, this.MajorGoalService.getMajorGoalById(goalId)];
                case 2:
                    goal = _b.sent();
                    if (!goal || goal.user.id !== user.id) {
                        res.status(404).json({ message: 'Goal not found or access denied.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.service.getPlansForGoal(goalId)];
                case 3:
                    plans = _b.sent();
                    res.json(plans);
                    return [3 /*break*/, 5];
                case 4:
                    error_6 = _b.sent();
                    errorMessage = error_6 instanceof Error ? error_6.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return CustomInstallmentPlanController;
}());
exports.CustomInstallmentPlanController = CustomInstallmentPlanController;
//# sourceMappingURL=customPlanInstallment.controller.js.map