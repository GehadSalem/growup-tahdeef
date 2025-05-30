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
const typeorm_1 = require("typeorm");
const data_source_1 = require("../dbConfig/data-source");
const Income_1 = require("../entities/Income");
class IncomeService {
    constructor() {
        this.incomeRepository = data_source_1.AppDataSource.getRepository(Income_1.Income);
    }
    createIncome(incomeData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newIncome = this.incomeRepository.create(Object.assign(Object.assign({}, incomeData), { user: { id: userId } }));
            return yield this.incomeRepository.save(newIncome);
        });
    }
    getUserIncomes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.incomeRepository.find({
                where: { user: { id: userId } }
            });
        });
    }
    updateIncome(incomeId, userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const income = yield this.incomeRepository.findOne({
                where: { id: incomeId, user: { id: userId } }
            });
            if (!income)
                return null;
            Object.assign(income, updateData);
            return yield this.incomeRepository.save(income);
        });
    }
    deleteIncome(incomeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.incomeRepository.delete({
                id: incomeId,
                user: { id: userId }
            });
            return result.affected !== 0;
        });
    }
    getIncomeById(incomeId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.incomeRepository.findOne({
                where: { id: incomeId, user: { id: userId } }
            });
        });
    }
    getIncomesByDateRange(userId, year, month) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = month !== undefined
                ? new Date(year, month - 1, 1)
                : new Date(year, 0, 1);
            const endDate = month !== undefined
                ? new Date(year, month, 0, 23, 59, 59)
                : new Date(year, 11, 31, 23, 59, 59);
            return yield this.incomeRepository.find({
                where: {
                    user: { id: userId },
                    date: (0, typeorm_1.Between)(startDate, endDate)
                },
                order: { date: 'DESC' }
            });
        });
    }
}
exports.default = IncomeService;
