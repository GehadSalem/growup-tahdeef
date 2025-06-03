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
var users_service_1 = require("../Services/users.service.js");
var UserController = /** @class */ (function () {
    function UserController() {
        this.userService = new users_service_1.UserService();
    }
    UserController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, token, error_1, errorMessage;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.userService.register(req.body)];
                    case 1:
                        _a = _b.sent(), user = _a.user, token = _a.token;
                        return [4 /*yield*/, this.userService.setupDefaultHabits(user.id)];
                    case 2:
                        _b.sent();
                        res.status(201).json({ user: user, token: token });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        errorMessage = error_1 instanceof Error ? error_1.message : "An unknown error occurred";
                        res.status(400).json({ message: errorMessage });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, _b, user, token, error_2, errorMessage;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, this.userService.login(email, password)];
                    case 1:
                        _b = _c.sent(), user = _b.user, token = _b.token;
                        res.json({ user: user, token: token });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _c.sent();
                        errorMessage = error_2 instanceof Error ? error_2.message : "An unknown error occurred";
                        res.status(401).json({ message: errorMessage });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateIncome = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_3, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.user) {
                            return [2 /*return*/, res.status(400).json({ message: "User information is missing in the request." })];
                        }
                        return [4 /*yield*/, this.userService.updateMonthlyIncome(req.user.id, req.body.monthlyIncome)];
                    case 1:
                        user = _a.sent();
                        res.json(user);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        errorMessage = error_3 instanceof Error ? error_3.message : "An unknown error occurred";
                        res.status(400).json({ message: errorMessage });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getFinancialOverview = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var overview, error_4, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.user) {
                            return [2 /*return*/, res.status(400).json({ message: "User information is missing in the request." })];
                        }
                        return [4 /*yield*/, this.userService.getFinancialOverview(req.user.id)];
                    case 1:
                        overview = _a.sent();
                        res.json(overview);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        errorMessage = error_4 instanceof Error ? error_4.message : "An unknown error occurred";
                        res.status(400).json({ message: errorMessage });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map