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
exports.InstallmentRepository = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../dbConfig/data-source");
const Installment_1 = require("../entities/Installment");
class InstallmentRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(Installment_1.InstallmentPayment);
    }
    create(installmentPayment) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.save(installmentPayment);
        });
    }
    findByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: {
                    installmentPlan: { user: { id: user.id } } // Query through installmentPlan->user
                },
                relations: ['installmentPlan'] // Include the plan in the result
            });
        });
    }
    findById(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({
                where: {
                    id,
                    installmentPlan: { user: { id: user.id } } // Query through installmentPlan->user
                },
                relations: ['installmentPlan'] // Include the plan in the result
            });
        });
    }
    update(id, updateData, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // First verify the installment belongs to the user
            const existing = yield this.findById(id, user);
            if (!existing)
                return null;
            yield this.repository.update({ id }, updateData);
            return this.findById(id, user);
        });
    }
    delete(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // First verify the installment belongs to the user
            const existing = yield this.findById(id, user);
            if (!existing)
                return false;
            const result = yield this.repository.delete({ id });
            return result.affected !== 0;
        });
    }
    findByDateRange(user, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: {
                    installmentPlan: { user: { id: user.id } }, // Query through installmentPlan->user
                    paymentDate: (0, typeorm_1.Between)(startDate, endDate)
                },
                relations: ['installmentPlan'] // Include the plan in the result
            });
        });
    }
    findByStatus(user, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: {
                    installmentPlan: { user: { id: user.id } }, // Query through installmentPlan->user
                    status
                },
                relations: ['installmentPlan'] // Include the plan in the result
            });
        });
    }
    markAsPaid(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // First verify the installment belongs to the user
            const existing = yield this.findById(id, user);
            if (!existing)
                return null;
            yield this.repository.update({ id }, {
                status: 'paid',
                paymentDate: new Date()
            });
            return this.findById(id, user);
        });
    }
}
exports.InstallmentRepository = InstallmentRepository;
