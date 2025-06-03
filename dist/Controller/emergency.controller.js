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
require("../types/express.js");
var emergency_service_1 = require("../Services/emergency.service.js");
var EmergencyController = /** @class */ (function () {
    function EmergencyController() {
    }
    var _a;
    _a = EmergencyController;
    EmergencyController.emergencyService = new emergency_service_1.EmergencyService();
    EmergencyController.addToEmergencyFund = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var amount, emergencyFund, error_1, errorMessage;
        var _b;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    amount = Number(request.body.amount);
                    if (isNaN(amount)) {
                        response.status(400).json({ message: 'Amount must be a valid number' });
                        return [2 /*return*/];
                    }
                    if (!request.user) {
                        response.status(401).json({ message: 'Unauthorized' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.emergencyService.addToFund((_b = request.user) === null || _b === void 0 ? void 0 : _b.id, amount, request.body.description)];
                case 1:
                    emergencyFund = _c.sent();
                    response.status(201).json(emergencyFund);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _c.sent();
                    errorMessage = error_1 instanceof Error ? error_1.message : 'An unknown error occurred';
                    response.status(400).json({ message: errorMessage });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    EmergencyController.getEmergencyFunds = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var funds, error_2, errorMessage;
        var _b;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    if (!request.user) {
                        response.status(401).json({ message: 'Unauthorized' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.emergencyService.getUserFunds((_b = request.user) === null || _b === void 0 ? void 0 : _b.id)];
                case 1:
                    funds = _c.sent();
                    response.json(funds);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _c.sent();
                    errorMessage = error_2 instanceof Error ? error_2.message : 'An unknown error occurred';
                    response.status(500).json({ message: errorMessage });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    EmergencyController.calculateEmergencyFund = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var suggestedAmount, error_3, errorMessage;
        var _b;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    if (!request.user) {
                        response.status(401).json({ message: 'Unauthorized' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.emergencyService.calculateSuggestedAmount((_b = request.user) === null || _b === void 0 ? void 0 : _b.id)];
                case 1:
                    suggestedAmount = _c.sent();
                    response.json({ suggestedAmount: suggestedAmount });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _c.sent();
                    errorMessage = error_3 instanceof Error ? error_3.message : 'An unknown error occurred';
                    response.status(400).json({ message: errorMessage });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return EmergencyController;
}());
exports.default = EmergencyController;
//# sourceMappingURL=emergency.controller.js.map