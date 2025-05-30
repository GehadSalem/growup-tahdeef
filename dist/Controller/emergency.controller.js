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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("../types/express");
const emergency_service_1 = require("../Services/emergency.service");
class EmergencyController {
}
_a = EmergencyController;
EmergencyController.emergencyService = new emergency_service_1.EmergencyService();
EmergencyController.addToEmergencyFund = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const amount = Number(request.body.amount);
        if (isNaN(amount)) {
            response.status(400).json({ message: 'Amount must be a valid number' });
            return;
        }
        if (!request.user) {
            response.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const emergencyFund = yield _a.emergencyService.addToFund((_b = request.user) === null || _b === void 0 ? void 0 : _b.id, amount, request.body.description);
        response.status(201).json(emergencyFund);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        response.status(400).json({ message: errorMessage });
    }
});
EmergencyController.getEmergencyFunds = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!request.user) {
            response.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const funds = yield _a.emergencyService.getUserFunds((_b = request.user) === null || _b === void 0 ? void 0 : _b.id);
        response.json(funds);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        response.status(500).json({ message: errorMessage });
    }
});
EmergencyController.calculateEmergencyFund = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!request.user) {
            response.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const suggestedAmount = yield _a.emergencyService.calculateSuggestedAmount((_b = request.user) === null || _b === void 0 ? void 0 : _b.id);
        response.json({ suggestedAmount });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        response.status(400).json({ message: errorMessage });
    }
});
exports.default = EmergencyController;
