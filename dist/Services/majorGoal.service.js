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
exports.MajorGoalService = void 0;
const data_source_1 = require("../dbConfig/data-source");
const MajorGoal_1 = require("../entities/MajorGoal");
class MajorGoalService {
    constructor() {
        this.majorGoalRepository = data_source_1.AppDataSource.getRepository(MajorGoal_1.MajorGoal);
    }
    createMajorGoal(user, goalData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newGoal = this.majorGoalRepository.create(Object.assign(Object.assign({}, goalData), { user }));
            return yield this.majorGoalRepository.save(newGoal);
        });
    }
    getUserMajorGoals(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.majorGoalRepository.find({
                where: { user: { id: userId } },
                relations: ['user']
            });
        });
    }
    updateMajorGoal(goalId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const goal = yield this.majorGoalRepository.findOneBy({ id: goalId });
            if (!goal)
                throw new Error('Major goal not found');
            Object.assign(goal, updateData);
            return yield this.majorGoalRepository.save(goal);
        });
    }
    deleteMajorGoal(goalId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.majorGoalRepository.delete(goalId);
        });
    }
    updateProgress(goalId, progress) {
        return __awaiter(this, void 0, void 0, function* () {
            const goal = yield this.majorGoalRepository.findOneBy({ id: goalId });
            if (!goal)
                throw new Error('Major goal not found');
            goal.progress = progress;
            if (progress >= 100) {
                goal.status = 'completed';
            }
            else if (progress > 0) {
                goal.status = 'in-progress';
            }
            return yield this.majorGoalRepository.save(goal);
        });
    }
    static getMajorGoalById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return MajorGoal_1.MajorGoal.findOne({
                where: { id },
                relations: ['user']
            });
        });
    }
    static updateGoalProgress(goalId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const goal = yield MajorGoal_1.MajorGoal.findOne({
                where: { id: goalId },
                relations: ['linkedInstallments', 'linkedInstallments.payments']
            });
            if (!goal)
                return;
            let totalPaid = 0;
            // Sum all payments from all linked installment plans
            (_a = goal.linkedInstallments) === null || _a === void 0 ? void 0 : _a.forEach((plan) => {
                var _a;
                (_a = plan.payments) === null || _a === void 0 ? void 0 : _a.forEach(payment => {
                    if (payment.status === 'paid') {
                        totalPaid += payment.amount;
                    }
                });
            });
            const newProgress = (totalPaid / goal.estimatedCost) * 100;
            const newStatus = newProgress >= 100 ? 'completed' :
                newProgress > 0 ? 'in-progress' : 'planned';
            yield MajorGoal_1.MajorGoal.update(goalId, {
                progress: Math.min(newProgress, 100),
                status: newStatus
            });
        });
    }
}
exports.MajorGoalService = MajorGoalService;
