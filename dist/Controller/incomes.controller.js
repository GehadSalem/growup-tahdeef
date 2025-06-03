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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var users_service_1 = require("../Services/users.service.js");
require("../types/express.js");
var income_service_1 = __importDefault(require("../Services/income.service.js"));
var IncomeController = /** @class */ (function () {
    function IncomeController() {
    }
    var _a;
    _a = IncomeController;
    IncomeController.incomeService = new income_service_1.default();
    IncomeController.userService = new users_service_1.UserService();
    IncomeController.addIncome = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, amount, description, incomeDate, user, newIncome, error_1, errorMessage;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information is missing.' });
                        return [2 /*return*/];
                    }
                    _b = req.body, amount = _b.amount, description = _b.description, incomeDate = _b.incomeDate;
                    // Basic validation
                    if (!amount || !description || !incomeDate) {
                        res.status(400).json({ message: 'Amount, description, and date are required.' });
                        return [2 /*return*/];
                    }
                    if (amount <= 0) {
                        res.status(400).json({ message: 'Amount must be positive.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.userService.getUserById(req.user.id)];
                case 1:
                    user = _c.sent();
                    if (!user) {
                        res.status(404).json({ message: 'User not found.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.incomeService.createIncome({ amount: amount, description: description, date: new Date(incomeDate) }, req.user.id)];
                case 2:
                    newIncome = _c.sent();
                    res.status(201).json(newIncome);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    errorMessage = error_1 instanceof Error ? error_1.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    IncomeController.getUserIncomes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var incomes, error_2, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information is missing.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.incomeService.getUserIncomes(req.user.id)];
                case 1:
                    incomes = _b.sent();
                    res.json(incomes);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    errorMessage = error_2 instanceof Error ? error_2.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    IncomeController.updateIncome = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, amount, date, description, updatedIncome, error_3, errorMessage;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information is missing.' });
                        return [2 /*return*/];
                    }
                    _b = req.body, amount = _b.amount, date = _b.date, description = _b.description;
                    // Validate amount if provided
                    if (amount !== undefined && (typeof amount !== 'number' || amount <= 0)) {
                        res.status(400).json({ message: 'Amount must be a positive number.' });
                        return [2 /*return*/];
                    }
                    // Validate date if provided
                    if (date !== undefined && isNaN(new Date(date).getTime())) {
                        res.status(400).json({ message: 'Invalid date format.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.incomeService.updateIncome(req.params.id, req.user.id, { amount: amount, date: date ? new Date(date) : undefined, description: description })];
                case 1:
                    updatedIncome = _c.sent();
                    if (!updatedIncome) {
                        res.status(404).json({ message: 'Income not found or access denied.' });
                        return [2 /*return*/];
                    }
                    res.json(updatedIncome);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _c.sent();
                    errorMessage = error_3 instanceof Error ? error_3.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    IncomeController.deleteIncome = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var success, error_4, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information is missing.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.incomeService.deleteIncome(req.params.id, req.user.id)];
                case 1:
                    success = _b.sent();
                    if (!success) {
                        res.status(404).json({ message: 'Income not found or access denied.' });
                        return [2 /*return*/];
                    }
                    res.status(204).send();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _b.sent();
                    errorMessage = error_4 instanceof Error ? error_4.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    IncomeController.getIncomeById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var income, error_5, errorMessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information is missing.' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.incomeService.getIncomeById(req.params.id, req.user.id)];
                case 1:
                    income = _b.sent();
                    if (!income) {
                        res.status(404).json({ message: 'Income not found or access denied.' });
                        return [2 /*return*/];
                    }
                    res.json(income);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _b.sent();
                    errorMessage = error_5 instanceof Error ? error_5.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    IncomeController.getIncomesByDate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, year, month, yearNum, monthNum, currentYear, incomes, error_6, errorMessage;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    if (!req.user) {
                        res.status(400).json({ message: 'User information is missing.' });
                        return [2 /*return*/];
                    }
                    _b = req.params, year = _b.year, month = _b.month;
                    yearNum = parseInt(year);
                    monthNum = month ? parseInt(month) : undefined;
                    currentYear = new Date().getFullYear();
                    if (isNaN(yearNum)) {
                        res.status(400).json({ message: 'Year must be a valid number' });
                        return [2 /*return*/];
                    }
                    if (yearNum < 2000 || yearNum > currentYear + 1) {
                        res.status(400).json({ message: "Year must be between 2000 and ".concat(currentYear + 1) });
                        return [2 /*return*/];
                    }
                    if (month && (isNaN(monthNum) || monthNum < 1 || monthNum > 12)) {
                        res.status(400).json({ message: 'Month must be between 1 and 12' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.incomeService.getIncomesByDateRange(req.user.id, yearNum, monthNum)];
                case 1:
                    incomes = _c.sent();
                    res.json({
                        data: incomes,
                        meta: {
                            year: yearNum,
                            month: monthNum || null,
                            count: incomes.length
                        }
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _c.sent();
                    errorMessage = error_6 instanceof Error ? error_6.message : 'An unknown error occurred';
                    res.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return IncomeController;
}());
exports.default = IncomeController;
//# sourceMappingURL=incomes.controller.js.map