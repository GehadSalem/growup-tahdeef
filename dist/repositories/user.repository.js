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
exports.UserRepository = void 0;
const data_source_1 = require("../../src/dbConfig/data-source");
const User_1 = require("../entities/User");
class UserRepository {
    findOne(arg0) {
        throw new Error('Method not implemented.');
    }
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({ where: { email } });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({ where: { id } });
        });
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.repository.create(userData);
            return this.repository.save(user);
        });
    }
    update(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(id, updateData);
            return this.findById(id);
        });
    }
    updateMonthlyIncome(id, income) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, { monthlyIncome: income });
        });
    }
    updateNotificationToken(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.update(id, { notificationToken: token });
        });
    }
}
exports.UserRepository = UserRepository;
