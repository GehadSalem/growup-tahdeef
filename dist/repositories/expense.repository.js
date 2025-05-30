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
exports.ExpenseRepository = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../../src/dbConfig/data-source");
const Expense_1 = require("../entities/Expense");
class ExpenseRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(Expense_1.Expense);
    }
    create(expenseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const expense = this.repository.create(expenseData);
            return this.repository.save(expense);
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
    findByUserAndMonth(userId, month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);
            return this.repository.find({
                where: {
                    user: { id: userId },
                    date: (0, typeorm_1.Between)(startDate, endDate)
                },
                relations: ['user']
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(id);
        });
    }
}
exports.ExpenseRepository = ExpenseRepository;
