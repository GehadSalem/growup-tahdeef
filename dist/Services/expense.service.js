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
exports.ExpenseService = void 0;
const expense_repository_1 = require("../repositories/expense.repository");
const user_repository_1 = require("../repositories/user.repository");
class ExpenseService {
    constructor() {
        this.expenseRepository = new expense_repository_1.ExpenseRepository();
        this.userRepository = new user_repository_1.UserRepository();
    }
    createExpense(userId, expenseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(userId);
            if (!user)
                throw new Error('User not found');
            const expense = yield this.expenseRepository.create(Object.assign(Object.assign({}, expenseData), { date: new Date(), user }));
            return expense;
        });
    }
    getUserExpenses(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.expenseRepository.findByUserId(userId);
        });
    }
    generateMonthlyReport(userId, month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const expenses = yield this.expenseRepository.findByUserAndMonth(userId, month, year);
            const total = expenses.reduce((sum, exp) => {
                var _a;
                const amount = (_a = exp.amount) !== null && _a !== void 0 ? _a : 0;
                return sum + amount;
            }, 0);
            const byCategory = expenses.reduce((acc, exp) => {
                var _a, _b;
                const category = (_a = exp.category) !== null && _a !== void 0 ? _a : 'Uncategorized';
                const amount = (_b = exp.amount) !== null && _b !== void 0 ? _b : 0;
                acc[category] = (acc[category] || 0) + amount;
                return acc;
            }, {});
            return { total, byCategory, expenses };
        });
    }
}
exports.ExpenseService = ExpenseService;
