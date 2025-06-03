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
exports.InstallmentRepository = void 0;
var typeorm_1 = require("typeorm");
var data_source_1 = require("../dbConfig/data-source");
var Installment_entity_1 = require("../entities/Installment.entity");
var InstallmentRepository = /** @class */ (function () {
    function InstallmentRepository() {
        this.repository = data_source_1.AppDataSource.getRepository(Installment_entity_1.InstallmentPayment);
    }
    InstallmentRepository.prototype.create = function (installmentPayment) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.save(installmentPayment)];
            });
        });
    };
    InstallmentRepository.prototype.findByUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.find({
                        where: {
                            installmentPlan: { user: { id: user.id } } // Query through installmentPlan->user
                        },
                        relations: ['installmentPlan'] // Include the plan in the result
                    })];
            });
        });
    };
    InstallmentRepository.prototype.findById = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.findOne({
                        where: {
                            id: id,
                            installmentPlan: { user: { id: user.id } } // Query through installmentPlan->user
                        },
                        relations: ['installmentPlan'] // Include the plan in the result
                    })];
            });
        });
    };
    InstallmentRepository.prototype.update = function (id, updateData, user) {
        return __awaiter(this, void 0, void 0, function () {
            var existing;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findById(id, user)];
                    case 1:
                        existing = _a.sent();
                        if (!existing)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, this.repository.update({ id: id }, updateData)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.findById(id, user)];
                }
            });
        });
    };
    InstallmentRepository.prototype.delete = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var existing, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findById(id, user)];
                    case 1:
                        existing = _a.sent();
                        if (!existing)
                            return [2 /*return*/, false];
                        return [4 /*yield*/, this.repository.delete({ id: id })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.affected !== 0];
                }
            });
        });
    };
    InstallmentRepository.prototype.findByDateRange = function (user, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.find({
                        where: {
                            installmentPlan: { user: { id: user.id } }, // Query through installmentPlan->user
                            paymentDate: (0, typeorm_1.Between)(startDate, endDate)
                        },
                        relations: ['installmentPlan'] // Include the plan in the result
                    })];
            });
        });
    };
    InstallmentRepository.prototype.findByStatus = function (user, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.find({
                        where: {
                            installmentPlan: { user: { id: user.id } }, // Query through installmentPlan->user
                            status: status
                        },
                        relations: ['installmentPlan'] // Include the plan in the result
                    })];
            });
        });
    };
    InstallmentRepository.prototype.markAsPaid = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var existing;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findById(id, user)];
                    case 1:
                        existing = _a.sent();
                        if (!existing)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, this.repository.update({ id: id }, {
                                status: 'paid',
                                paymentDate: new Date()
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.findById(id, user)];
                }
            });
        });
    };
    return InstallmentRepository;
}());
exports.InstallmentRepository = InstallmentRepository;
//# sourceMappingURL=installment.repository.js.map