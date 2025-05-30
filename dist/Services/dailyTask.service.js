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
exports.DailyTaskService = void 0;
const dailyTasks_repository_1 = require("../repositories/dailyTasks.repository");
class DailyTaskService {
    constructor(dailyTaskRepo) {
        this.dailyTaskRepo = dailyTaskRepo || new dailyTasks_repository_1.DailyTaskRepository();
    }
    create(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dailyTaskRepo.create(Object.assign(Object.assign({}, data), { user: { id: userId } }));
        });
    }
    getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dailyTaskRepo.findByUserId(userId);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dailyTaskRepo.findById(id);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dailyTaskRepo.update(id, data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dailyTaskRepo.delete(id);
            return true;
        });
    }
    markAsComplete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dailyTaskRepo.markAsComplete(id);
        });
    }
}
exports.DailyTaskService = DailyTaskService;
