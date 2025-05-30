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
exports.DailyTaskRepository = void 0;
const data_source_1 = require("../dbConfig/data-source");
const DailyTask_1 = require("../entities/DailyTask");
class DailyTaskRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(DailyTask_1.DailyTask);
    }
    create(dailyTaskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const dailyTask = this.repository.create(dailyTaskData);
            return this.repository.save(dailyTask);
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
    update(id, dailyTaskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const dailyTask = yield this.repository.findOneBy({ id });
            if (!dailyTask)
                return null;
            Object.assign(dailyTask, dailyTaskData);
            return this.repository.save(dailyTask);
        });
    }
    markAsComplete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dailyTask = yield this.repository.findOneBy({ id });
            if (!dailyTask)
                return null;
            dailyTask.isCompleted = true;
            dailyTask.streak += 1;
            return this.repository.save(dailyTask);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(id);
        });
    }
}
exports.DailyTaskRepository = DailyTaskRepository;
