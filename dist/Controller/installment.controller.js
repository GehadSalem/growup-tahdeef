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
exports.InstallmentController = void 0;
require("../types/express");
var installment_service_1 = require("../Services/installment.service");
var users_service_1 = require("../Services/users.service");
var Installment_entity_1 = require("../entities/Installment.entity");
var majorGoal_service_1 = require("../Services/majorGoal.service");
var CustomInstallmentPlan_entity_1 = require("../entities/CustomInstallmentPlan.entity");
var data_source_1 = require("../dbConfig/data-source");
var InstallmentController = /** @class */ (function () {
    function InstallmentController() {
    }
    var _a;
    _a = InstallmentController;
    InstallmentController.service = new installment_service_1.InstallmentService();
    InstallmentController.userService = new users_service_1.UserService();
    InstallmentController.addInstallment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, amount, paymentDate, status_1, paymentMethod, installmentPlanId, plan, payment, savedPayment, error_1;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    _b = req.body, amount = _b.amount, paymentDate = _b.paymentDate, status_1 = _b.status, paymentMethod = _b.paymentMethod, installmentPlanId = _b.installmentPlanId;
                    // Validate input
                    if (!amount || !paymentDate || !installmentPlanId) {
                        return [2 /*return*/, res.status(400).json({ message: 'Missing required fields' })];
                    }
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(CustomInstallmentPlan_entity_1.CustomInstallmentPlan).findOne({
                            where: { id: installmentPlanId },
                            relations: ['linkedGoal']
                        })];
                case 1:
                    plan = _c.sent();
                    if (!plan) {
                        return [2 /*return*/, res.status(404).json({ message: 'Installment plan not found' })];
                    }
                    payment = new Installment_entity_1.InstallmentPayment();
                    payment.amount = amount;
                    payment.paymentDate = new Date(paymentDate);
                    payment.status = status_1 || 'pending';
                    payment.paymentMethod = paymentMethod || 'bank_transfer';
                    payment.installmentPlan = plan;
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Installment_entity_1.InstallmentPayment).save(payment)];
                case 2:
                    savedPayment = _c.sent();
                    return [2 /*return*/, res.status(201).json(savedPayment)];
                case 3:
                    error_1 = _c.sent();
                    res.status(500).json({ message: error_1 instanceof Error ? error_1.message : 'Unknown error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    InstallmentController.markInstallmentPaid = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, installment, error_2;
        var _b;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information missing' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.userService.getUserById(req.user.id)];
                case 1:
                    user = _c.sent();
                    if (!user) {
                        res.status(404).json({ message: 'User not found' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.service.markInstallmentPaid(req.params.id, user)];
                case 2:
                    installment = _c.sent();
                    if (!installment) {
                        res.status(404).json({ message: 'Installment not found' });
                        return [2 /*return*/];
                    }
                    if (!((_b = installment.installmentPlan) === null || _b === void 0 ? void 0 : _b.linkedGoal)) return [3 /*break*/, 4];
                    return [4 /*yield*/, majorGoal_service_1.MajorGoalService.updateGoalProgress(installment.installmentPlan.linkedGoal.id)];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4:
                    res.json(installment);
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _c.sent();
                    res.status(500).json({ message: error_2 instanceof Error ? error_2.message : 'Unknown error' });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    InstallmentController.getUserInstallments = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, installments, error_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information missing' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.userService.getUserById(req.user.id)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        res.status(404).json({ message: 'User not found' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.service.getUserInstallments(user)];
                case 2:
                    installments = _b.sent();
                    res.json(installments);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    res.status(500).json({ message: error_3 instanceof Error ? error_3.message : 'Unknown error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    InstallmentController.updateInstallment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, updated, error_4;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information missing' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.userService.getUserById(req.user.id)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        res.status(404).json({ message: 'User not found' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.service.updateInstallment(req.params.id, req.body, user)];
                case 2:
                    updated = _b.sent();
                    if (!updated) {
                        res.status(404).json({ message: 'Installment not found' });
                        return [2 /*return*/];
                    }
                    res.json(updated);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _b.sent();
                    res.status(500).json({ message: error_4 instanceof Error ? error_4.message : 'Unknown error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    InstallmentController.deleteInstallment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, success, error_5;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information missing' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.userService.getUserById(req.user.id)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        res.status(404).json({ message: 'User not found' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.service.deleteInstallment(req.params.id, user)];
                case 2:
                    success = _b.sent();
                    if (!success) {
                        res.status(404).json({ message: 'Installment not found' });
                        return [2 /*return*/];
                    }
                    res.status(204).send();
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _b.sent();
                    res.status(500).json({ message: error_5 instanceof Error ? error_5.message : 'Unknown error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    InstallmentController.getInstallmentById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, installment, error_6;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information missing' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.userService.getUserById(req.user.id)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        res.status(404).json({ message: 'User not found' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.service.getInstallmentById(req.params.id, user)];
                case 2:
                    installment = _b.sent();
                    if (!installment) {
                        res.status(404).json({ message: 'Installment not found' });
                        return [2 /*return*/];
                    }
                    res.json(installment);
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _b.sent();
                    res.status(500).json({ message: error_6 instanceof Error ? error_6.message : 'Unknown error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return InstallmentController;
}());
exports.InstallmentController = InstallmentController;
//# sourceMappingURL=installment.controller.js.map