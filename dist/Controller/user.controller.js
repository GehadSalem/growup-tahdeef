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
require("../types/express");
var users_service_1 = require("../Services/users.service");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    var _a;
    _a = UserController;
    UserController.userService = new users_service_1.UserService();
    UserController.register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, user, token, error_1;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, this.userService.register(req.body)];
                case 1:
                    _b = _c.sent(), user = _b.user, token = _b.token;
                    return [4 /*yield*/, this.userService.setupDefaultHabits(user.id)];
                case 2:
                    _c.sent();
                    res.status(201).json({ user: user, token: token });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    res.status(400).json({
                        message: error_1 instanceof Error ? error_1.message : 'Registration failed'
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    UserController.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, email, password, _c, user, token, error_2;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    _b = req.body, email = _b.email, password = _b.password;
                    return [4 /*yield*/, this.userService.login(email, password)];
                case 1:
                    _c = _d.sent(), user = _c.user, token = _c.token;
                    res.json({ user: user, token: token });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _d.sent();
                    res.status(401).json({
                        message: error_2 instanceof Error ? error_2.message : 'Login failed'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    UserController.updateIncome = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, error_3;
        var _b;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    if (!((_b = req.user) === null || _b === void 0 ? void 0 : _b.id)) {
                        res.status(401).json({ message: 'Unauthorized' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.userService.updateMonthlyIncome(req.user.id, req.body.monthlyIncome)];
                case 1:
                    user = _c.sent();
                    res.json(user);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _c.sent();
                    res.status(500).json({
                        message: error_3 instanceof Error ? error_3.message : 'Income update failed'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    UserController.getFinancialOverview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var overview, error_4;
        var _b;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    if (!((_b = req.user) === null || _b === void 0 ? void 0 : _b.id)) {
                        res.status(401).json({ message: 'Unauthorized' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.userService.getFinancialOverview(req.user.id)];
                case 1:
                    overview = _c.sent();
                    res.json(overview);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _c.sent();
                    res.status(500).json({
                        message: error_4 instanceof Error ? error_4.message : 'Failed to get financial overview'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Admin Endpoints
    UserController.getAllUsers = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
        var users, error_5;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, this.userService.getAllUsers()];
                case 1:
                    users = _b.sent();
                    res.json(users);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _b.sent();
                    res.status(500).json({
                        message: error_5 instanceof Error ? error_5.message : 'Failed to get users'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    UserController.getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, error_6;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, this.userService.getUserById(req.params.id)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        res.status(404).json({ message: 'User not found' });
                        return [2 /*return*/];
                    }
                    res.json(user);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _b.sent();
                    res.status(500).json({
                        message: error_6 instanceof Error ? error_6.message : 'Failed to get user'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    UserController.updateUserStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var error_7;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!req.params.id || typeof req.body.isActive !== 'boolean') {
                        res.status(400).json({ message: 'Invalid request parameters' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, this.userService.updateUserStatus(req.params.id, req.body.isActive)];
                case 1:
                    _b.sent();
                    res.json({ message: 'User status updated successfully' });
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _b.sent();
                    res.status(500).json({
                        message: error_7 instanceof Error ? error_7.message : 'Failed to update user status'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map