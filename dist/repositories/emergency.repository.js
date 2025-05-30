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
exports.EmergencyRepository = void 0;
const data_source_1 = require("../dbConfig/data-source");
const EmergencyFund_1 = require("../entities/EmergencyFund");
class EmergencyRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(EmergencyFund_1.EmergencyFund);
    }
    createFund(fundData) {
        return __awaiter(this, void 0, void 0, function* () {
            const fund = this.repository.create(fundData);
            return this.repository.save(fund);
        });
    }
    findUserFunds(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: { user: { id: userId } },
                order: { date: 'DESC' }
            });
        });
    }
    find(arg0) {
        throw new Error('Method not implemented.');
    }
    save(fund) {
        throw new Error('Method not implemented.');
    }
    create(fundData) {
        return __awaiter(this, void 0, void 0, function* () {
            const fund = this.repository.create(fundData);
            return this.repository.save(fund);
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: { user: { id: userId } },
                relations: ['user'],
                order: { date: 'DESC' }
            });
        });
    }
    getTotalAmount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository
                .createQueryBuilder('fund')
                .select('SUM(fund.amount)', 'total')
                .where('fund.userId = :userId', { userId })
                .getRawOne();
            return (result === null || result === void 0 ? void 0 : result.total) || 0;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(id);
        });
    }
}
exports.EmergencyRepository = EmergencyRepository;
