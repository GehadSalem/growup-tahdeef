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
exports.SavingsGoalService = void 0;
const data_source_1 = require("../dbConfig/data-source");
const SavingsGoal_1 = require("../entities/SavingsGoal");
class SavingsGoalService {
    constructor() {
        this.savingsGoalRepository = data_source_1.AppDataSource.getRepository(SavingsGoal_1.SavingsGoal);
    }
    createSavingsGoal(user, goalData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newGoal = this.savingsGoalRepository.create(Object.assign(Object.assign({}, goalData), { user }));
            return yield this.savingsGoalRepository.save(newGoal);
        });
    }
    getUserSavingsGoals(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.savingsGoalRepository.find({
                where: { user: { id: userId } },
                relations: ['user']
            });
        });
    }
    getSavingsGoalById(goalId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.savingsGoalRepository.findOne({
                where: { id: goalId },
                relations: ['user'], // so you can check the owner in controller
            });
        });
    }
    updateSavingsGoal(goalId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const goal = yield this.savingsGoalRepository.findOneBy({ id: goalId });
            if (!goal)
                throw new Error('Savings goal not found');
            Object.assign(goal, updateData);
            return yield this.savingsGoalRepository.save(goal);
        });
    }
    deleteSavingsGoal(goalId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.savingsGoalRepository.delete(goalId);
        });
    }
    addToSavingsGoal(goalId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const goal = yield this.savingsGoalRepository.findOneBy({ id: goalId });
            if (!goal)
                throw new Error('Savings goal not found');
            goal.currentAmount += amount;
            if (goal.currentAmount >= goal.targetAmount) {
                goal.status = 'completed';
            }
            return yield this.savingsGoalRepository.save(goal);
        });
    }
}
exports.SavingsGoalService = SavingsGoalService;
