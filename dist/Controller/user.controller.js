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
const users_service_1 = require("../Services/users.service");
class UserController {
    constructor() {
        this.userService = new users_service_1.UserService();
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, token } = yield this.userService.register(req.body);
                yield this.userService.setupDefaultHabits(user.id);
                res.status(201).json({ user, token });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                res.status(400).json({ message: errorMessage });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { user, token } = yield this.userService.login(email, password);
                res.json({ user, token });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                res.status(401).json({ message: errorMessage });
            }
        });
    }
    updateIncome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return res.status(400).json({ message: "User information is missing in the request." });
                }
                const user = yield this.userService.updateMonthlyIncome(req.user.id, req.body.monthlyIncome);
                res.json(user);
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                res.status(400).json({ message: errorMessage });
            }
        });
    }
    getFinancialOverview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return res.status(400).json({ message: "User information is missing in the request." });
                }
                const overview = yield this.userService.getFinancialOverview(req.user.id);
                res.json(overview);
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                res.status(400).json({ message: errorMessage });
            }
        });
    }
}
exports.default = UserController;
