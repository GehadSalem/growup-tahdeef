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
const data_source_1 = require("../../src/dbConfig/data-source");
const Income_1 = require("../entities/Income");
class IncomeRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(Income_1.Income);
    }
    // Basic CRUD operations
    create(incomeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const income = this.repository.create(incomeData);
            return this.repository.save(income);
        });
    }
    save(income) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.save(income);
        });
    }
    find(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find(options);
        });
    }
    findOne(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne(options);
        });
    }
    // Specific find methods
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({
                where: { id },
                relations: ['user']
            });
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: { user: { id: userId } },
                relations: ['user'],
                order: { date: 'DESC' } // Changed from incomeDate to date
            });
        });
    }
    // Create with user
    createForUser(user, incomeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const income = this.repository.create(Object.assign(Object.assign({}, incomeData), { user, date: incomeData.date || new Date() }));
            return this.repository.save(income);
        });
    }
    // Update operations
    update(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(id, updateData);
            return this.findById(id);
        });
    }
    updateByCriteria(criteria, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.update(criteria, updateData);
        });
    }
    // Time-based queries
    findByMonth(userId, year, month) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0, 23, 59, 59);
            return this.repository.find({
                where: {
                    user: { id: userId },
                    date: (0, typeorm_1.Between)(startDate, endDate)
                },
                relations: ['user'],
                order: { date: 'DESC' }
            });
        });
    }
    // Delete operation
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository.delete(id);
            return result.affected !== 0;
        });
    }
}
exports.default = IncomeRepository;
