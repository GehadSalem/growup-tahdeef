"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeService = void 0;
var data_source_1 = require("../dbConfig/data-source");
var Income_entity_1 = require("../entities/Income.entity");
var IncomeService = /** @class */ (function () {
    function IncomeService() {
        this.incomeRepository = data_source_1.AppDataSource.getRepository(Income_entity_1.Income);
    }
    IncomeService.prototype.createIncome = function (user, incomeData) {
        return __awaiter(this, void 0, void 0, function () {
            var newIncome;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!incomeData.amount || incomeData.amount <= 0) {
                            throw new Error('Amount must be a positive number');
                        }
                        if (!incomeData.description || incomeData.description.trim() === '') {
                            throw new Error('Income description is required');
                        }
                        newIncome = this.incomeRepository.create(__assign(__assign({}, incomeData), { user: user, date: incomeData.date || new Date() }));
                        return [4 /*yield*/, this.incomeRepository.save(newIncome)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IncomeService.prototype.getUserIncomes = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.incomeRepository.find({
                            where: { user: { id: userId } },
                            relations: ['user'],
                            order: { date: 'DESC' }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IncomeService.prototype.getMonthlyIncomes = function (userId, year, month) {
        return __awaiter(this, void 0, void 0, function () {
            var startDate, endDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (month < 1 || month > 12) {
                            throw new Error('Month must be between 1 and 12');
                        }
                        startDate = new Date(year, month - 1, 1);
                        endDate = new Date(year, month, 0, 23, 59, 59);
                        return [4 /*yield*/, this.incomeRepository.createQueryBuilder('income')
                                .leftJoinAndSelect('income.user', 'user')
                                .where('income.userId = :userId', { userId: userId })
                                .andWhere('income.date BETWEEN :startDate AND :endDate', {
                                startDate: startDate.toISOString(),
                                endDate: endDate.toISOString()
                            })
                                .orderBy('income.date', 'DESC')
                                .getMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IncomeService.prototype.getYearlyIncomes = function (userId, year) {
        return __awaiter(this, void 0, void 0, function () {
            var currentYear, startDate, endDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentYear = new Date().getFullYear();
                        if (year < 2000 || year > currentYear + 5) {
                            throw new Error("Year must be between 2000 and ".concat(currentYear + 5));
                        }
                        startDate = new Date(year, 0, 1);
                        endDate = new Date(year, 11, 31, 23, 59, 59);
                        return [4 /*yield*/, this.incomeRepository.createQueryBuilder('income')
                                .leftJoinAndSelect('income.user', 'user')
                                .where('income.userId = :userId', { userId: userId })
                                .andWhere('income.date BETWEEN :startDate AND :endDate', {
                                startDate: startDate.toISOString(),
                                endDate: endDate.toISOString()
                            })
                                .orderBy('income.date', 'DESC')
                                .getMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IncomeService.prototype.updateIncome = function (id, updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var income;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (updateData.amount && updateData.amount <= 0) {
                            throw new Error('Amount must be a positive number');
                        }
                        return [4 /*yield*/, this.incomeRepository.findOneBy({ id: id })];
                    case 1:
                        income = _a.sent();
                        if (!income) {
                            throw new Error('Income not found');
                        }
                        Object.assign(income, updateData);
                        return [4 /*yield*/, this.incomeRepository.save(income)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IncomeService.prototype.deleteIncome = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.incomeRepository.delete(id)];
                    case 1:
                        result = _a.sent();
                        if (result.affected === 0) {
                            throw new Error('Income not found or could not be deleted');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    IncomeService.prototype.getIncomeById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var income;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.incomeRepository.findOne({
                            where: { id: id },
                            relations: ['user']
                        })];
                    case 1:
                        income = _a.sent();
                        if (!income) {
                            throw new Error('Income not found');
                        }
                        return [2 /*return*/, income];
                }
            });
        });
    };
    return IncomeService;
}());
exports.IncomeService = IncomeService;
//# sourceMappingURL=income.service.js.map