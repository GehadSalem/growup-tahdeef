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
exports.InstallmentService = void 0;
const installment_repository_1 = require("../repositories/installment.repository");
class InstallmentService {
    constructor() {
        this.repository = new installment_repository_1.InstallmentRepository();
    }
    createInstallment(InstallmentPayment) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.create(InstallmentPayment);
        });
    }
    getUserInstallments(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findByUser(user);
        });
    }
    getInstallmentById(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findById(id, user);
        });
    }
    updateInstallment(id, updateData, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.update(id, updateData, user);
        });
    }
    deleteInstallment(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.delete(id, user);
        });
    }
    getInstallmentsByDateRange(user, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findByDateRange(user, startDate, endDate);
        });
    }
    getInstallmentsByStatus(user, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findByStatus(user, status);
        });
    }
    markInstallmentPaid(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.markAsPaid(id, user);
        });
    }
}
exports.InstallmentService = InstallmentService;
