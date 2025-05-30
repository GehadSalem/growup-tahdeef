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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("../types/express");
const installment_service_1 = require("../Services/installment.service");
const users_service_1 = require("../Services/users.service");
const Installment_1 = require("../entities/Installment");
const majorGoal_service_1 = require("../Services/majorGoal.service");
const CustomInstallmentPlan_1 = require("../entities/CustomInstallmentPlan");
const data_source_1 = require("../dbConfig/data-source");
class InstallmentController {
}
_a = InstallmentController;
InstallmentController.service = new installment_service_1.InstallmentService();
InstallmentController.userService = new users_service_1.UserService();
InstallmentController.addInstallment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, paymentDate, status, paymentMethod, installmentPlanId } = req.body;
        // Validate input
        if (!amount || !paymentDate || !installmentPlanId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        // Verify installment plan exists
        const plan = yield data_source_1.AppDataSource.getRepository(CustomInstallmentPlan_1.CustomInstallmentPlan).findOne({
            where: { id: installmentPlanId },
            relations: ['linkedGoal']
        });
        if (!plan) {
            return res.status(404).json({ message: 'Installment plan not found' });
        }
        // Create payment
        const payment = new Installment_1.InstallmentPayment();
        payment.amount = amount;
        payment.paymentDate = new Date(paymentDate);
        payment.status = status || 'pending';
        payment.paymentMethod = paymentMethod || 'bank_transfer';
        payment.installmentPlan = plan;
        // Save payment
        const savedPayment = yield data_source_1.AppDataSource.getRepository(Installment_1.InstallmentPayment).save(payment);
        return res.status(201).json(savedPayment);
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
});
InstallmentController.markInstallmentPaid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information missing' });
            return;
        }
        const user = yield _a.userService.getUserById(req.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const installment = yield _a.service.markInstallmentPaid(req.params.id, user);
        if (!installment) {
            res.status(404).json({ message: 'Installment not found' });
            return;
        }
        // Update goal progress if this installment is part of a plan linked to a goal
        if ((_b = installment.installmentPlan) === null || _b === void 0 ? void 0 : _b.linkedGoal) {
            yield majorGoal_service_1.MajorGoalService.updateGoalProgress(installment.installmentPlan.linkedGoal.id);
        }
        res.json(installment);
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
});
InstallmentController.getUserInstallments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information missing' });
            return;
        }
        const user = yield _a.userService.getUserById(req.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const installments = yield _a.service.getUserInstallments(user);
        res.json(installments);
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
});
InstallmentController.updateInstallment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information missing' });
            return;
        }
        const user = yield _a.userService.getUserById(req.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const updated = yield _a.service.updateInstallment(req.params.id, req.body, user);
        if (!updated) {
            res.status(404).json({ message: 'Installment not found' });
            return;
        }
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
});
InstallmentController.deleteInstallment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information missing' });
            return;
        }
        const user = yield _a.userService.getUserById(req.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const success = yield _a.service.deleteInstallment(req.params.id, user);
        if (!success) {
            res.status(404).json({ message: 'Installment not found' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
});
InstallmentController.getInstallmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information missing' });
            return;
        }
        const user = yield _a.userService.getUserById(req.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const installment = yield _a.service.getInstallmentById(req.params.id, user);
        if (!installment) {
            res.status(404).json({ message: 'Installment not found' });
            return;
        }
        res.json(installment);
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.default = InstallmentController;
