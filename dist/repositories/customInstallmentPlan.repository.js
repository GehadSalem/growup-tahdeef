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
exports.CustomInstallmentPlanRepository = void 0;
const data_source_1 = require("../dbConfig/data-source");
const CustomInstallmentPlan_1 = require("../entities/CustomInstallmentPlan");
class CustomInstallmentPlanRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(CustomInstallmentPlan_1.CustomInstallmentPlan);
    }
    create(planData) {
        return __awaiter(this, void 0, void 0, function* () {
            const plan = this.repository.create(planData);
            return yield this.repository.save(plan);
        });
    }
    findByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find({ where: { user } });
        });
    }
    findById(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({ where: { id, user } });
        });
    }
    update(id, updateData, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update({ id, user }, updateData);
            return this.findById(id, user);
        });
    }
    delete(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository.delete({ id, user });
            return result.affected !== 0;
        });
    }
}
exports.CustomInstallmentPlanRepository = CustomInstallmentPlanRepository;
