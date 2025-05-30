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
exports.CustomInstallmentPlanService = void 0;
const CustomInstallmentPlan_1 = require("../entities/CustomInstallmentPlan");
const MajorGoal_1 = require("../entities/MajorGoal");
const customInstallmentPlan_repository_1 = require("../repositories/customInstallmentPlan.repository");
class CustomInstallmentPlanService {
    constructor() {
        this.repository = new customInstallmentPlan_repository_1.CustomInstallmentPlanRepository();
    }
    createPlan(planData, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const plan = new CustomInstallmentPlan_1.CustomInstallmentPlan();
            Object.assign(plan, planData);
            plan.user = user;
            // Handle linked goal if provided
            if (planData.linkedGoalId) {
                plan.linkedGoal = yield MajorGoal_1.MajorGoal.findOne({
                    where: { id: planData.linkedGoalId }
                });
            }
            // Save and return with relations
            return this.repository.save(plan, {
                relations: ['linkedGoal'] // This loads the relationship
            });
        });
    }
    getUserPlans(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findByUser(user);
        });
    }
    getPlanById(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findById(id, user);
        });
    }
    updatePlan(id, updateData, user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // Get existing plan first
            const existingPlan = yield this.repository.findById(id, user);
            if (!existingPlan) {
                return null;
            }
            // Prepare the updated data
            const updatedPlan = Object.assign(Object.assign({}, existingPlan), updateData);
            // Recalculate monthly installment if totalCost or monthsCount changes
            if (updateData.totalCost !== undefined || updateData.monthsCount !== undefined) {
                const newTotalCost = (_a = updateData.totalCost) !== null && _a !== void 0 ? _a : existingPlan.totalCost;
                const newMonthsCount = (_b = updateData.monthsCount) !== null && _b !== void 0 ? _b : existingPlan.monthsCount;
                if (newTotalCost <= 0 || newMonthsCount <= 0) {
                    throw new Error('totalCost and monthsCount must be positive numbers');
                }
                updatedPlan.monthlyInstallment = newTotalCost / newMonthsCount;
            }
            return yield this.repository.update(id, updatedPlan, user);
        });
    }
    deletePlan(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.delete(id, user);
        });
    }
}
exports.CustomInstallmentPlanService = CustomInstallmentPlanService;
