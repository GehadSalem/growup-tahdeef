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
exports.SavingsGoalRepository = void 0;
const data_source_1 = require("../dbConfig/data-source");
const SavingsGoal_1 = require("../entities/SavingsGoal");
class SavingsGoalRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(SavingsGoal_1.SavingsGoal);
    }
    create(user, goalData) {
        return __awaiter(this, void 0, void 0, function* () {
            const goal = this.repository.create(Object.assign(Object.assign({}, goalData), { user }));
            return this.repository.save(goal);
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: { user: { id: userId } },
                relations: ['user'],
                order: { createdAt: 'DESC' }
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({
                where: { id },
                relations: ['user']
            });
        });
    }
    update(id, goalData) {
        return __awaiter(this, void 0, void 0, function* () {
            const goal = yield this.repository.findOneBy({ id });
            if (!goal)
                return null;
            Object.assign(goal, goalData);
            return this.repository.save(goal);
        });
    }
    addToGoal(id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const goal = yield this.repository.findOneBy({ id });
            if (!goal)
                return null;
            // Ensure both values are treated as numbers
            const current = typeof goal.currentAmount === 'string'
                ? parseFloat(goal.currentAmount)
                : goal.currentAmount;
            const amountToAdd = typeof amount === 'string'
                ? parseFloat(amount)
                : amount;
            // Perform the addition with proper decimal handling
            const newAmount = current + amountToAdd;
            goal.currentAmount = parseFloat(newAmount.toFixed(2));
            // Update status if target is reached
            if (goal.currentAmount >= goal.targetAmount) {
                goal.status = 'completed';
            }
            return this.repository.save(goal);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(id);
        });
    }
    getCompletedGoals(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: {
                    user: { id: userId },
                    status: 'completed'
                },
                order: { targetDate: 'ASC' }
            });
        });
    }
}
exports.SavingsGoalRepository = SavingsGoalRepository;
