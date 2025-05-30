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
const expense_service_1 = require("../Services/expense.service");
class ExpenseController {
}
_a = ExpenseController;
ExpenseController.expenseService = new expense_service_1.ExpenseService();
ExpenseController.addExpense = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!request.user) {
            response.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const expense = yield _a.expenseService.createExpense((_b = request.user) === null || _b === void 0 ? void 0 : _b.id, request.body);
        response.status(201).json(expense);
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(400).json({ message: error.message });
        }
        else {
            response.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});
ExpenseController.getExpenses = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!request.user) {
            response.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const expenses = yield _a.expenseService.getUserExpenses((_b = request.user) === null || _b === void 0 ? void 0 : _b.id);
        response.json(expenses);
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ message: error.message });
        }
        else {
            response.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});
ExpenseController.getMonthlyReport = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!request.user) {
            response.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const report = yield _a.expenseService.generateMonthlyReport((_b = request.user) === null || _b === void 0 ? void 0 : _b.id, parseInt(request.params.month), parseInt(request.params.year));
        response.json(report);
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(400).json({ message: error.message });
        }
        else {
            response.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});
exports.default = ExpenseController;
