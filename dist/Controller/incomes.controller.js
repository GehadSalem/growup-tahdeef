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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = require("../Services/users.service");
require("../types/express");
const income_service_1 = __importDefault(require("../Services/income.service"));
class IncomeController {
}
_a = IncomeController;
IncomeController.incomeService = new income_service_1.default();
IncomeController.userService = new users_service_1.UserService();
IncomeController.addIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information is missing.' });
            return;
        }
        const { amount, description, incomeDate } = req.body;
        // Basic validation
        if (!amount || !description || !incomeDate) {
            res.status(400).json({ message: 'Amount, description, and date are required.' });
            return;
        }
        if (amount <= 0) {
            res.status(400).json({ message: 'Amount must be positive.' });
            return;
        }
        const user = yield _a.userService.getUserById(req.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        const newIncome = yield _a.incomeService.createIncome({ amount, description, date: new Date(incomeDate) }, req.user.id);
        res.status(201).json(newIncome);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
IncomeController.getUserIncomes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information is missing.' });
            return;
        }
        const incomes = yield _a.incomeService.getUserIncomes(req.user.id);
        res.json(incomes);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
IncomeController.updateIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information is missing.' });
            return;
        }
        // Validate and extract only allowed fields
        const { amount, date, description } = req.body;
        // Validate amount if provided
        if (amount !== undefined && (typeof amount !== 'number' || amount <= 0)) {
            res.status(400).json({ message: 'Amount must be a positive number.' });
            return;
        }
        // Validate date if provided
        if (date !== undefined && isNaN(new Date(date).getTime())) {
            res.status(400).json({ message: 'Invalid date format.' });
            return;
        }
        const updatedIncome = yield _a.incomeService.updateIncome(req.params.id, req.user.id, { amount, date: date ? new Date(date) : undefined, description });
        if (!updatedIncome) {
            res.status(404).json({ message: 'Income not found or access denied.' });
            return;
        }
        res.json(updatedIncome);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
IncomeController.deleteIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information is missing.' });
            return;
        }
        const success = yield _a.incomeService.deleteIncome(req.params.id, req.user.id);
        if (!success) {
            res.status(404).json({ message: 'Income not found or access denied.' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
IncomeController.getIncomeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information is missing.' });
            return;
        }
        const income = yield _a.incomeService.getIncomeById(req.params.id, req.user.id);
        if (!income) {
            res.status(404).json({ message: 'Income not found or access denied.' });
            return;
        }
        res.json(income);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
IncomeController.getIncomesByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json({ message: 'User information is missing.' });
            return;
        }
        const { year, month } = req.params;
        const yearNum = parseInt(year);
        const monthNum = month ? parseInt(month) : undefined;
        // Basic validation
        const currentYear = new Date().getFullYear();
        if (isNaN(yearNum)) {
            res.status(400).json({ message: 'Year must be a valid number' });
            return;
        }
        if (yearNum < 2000 || yearNum > currentYear + 1) {
            res.status(400).json({ message: `Year must be between 2000 and ${currentYear + 1}` });
            return;
        }
        if (month && (isNaN(monthNum) || monthNum < 1 || monthNum > 12)) {
            res.status(400).json({ message: 'Month must be between 1 and 12' });
            return;
        }
        const incomes = yield _a.incomeService.getIncomesByDateRange(req.user.id, yearNum, monthNum);
        res.json({
            data: incomes,
            meta: {
                year: yearNum,
                month: monthNum || null,
                count: incomes.length
            }
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
});
exports.default = IncomeController;
