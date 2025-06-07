"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
exports.testConnection = testConnection;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var dotenv = __importStar(require("dotenv"));
var path_1 = __importDefault(require("path"));
var User_entity_1 = require("../entities/User.entity");
var Habit_entity_1 = require("../entities/Habit.entity");
var SavingsGoal_entity_1 = require("../entities/SavingsGoal.entity");
var MajorGoal_entity_1 = require("../entities/MajorGoal.entity");
var Notification_entity_1 = require("../entities/Notification.entity");
var Installment_entity_1 = require("../entities/Installment.entity");
var Income_entity_1 = require("../entities/Income.entity");
var Expense_entity_1 = require("../entities/Expense.entity");
var EmergencyFund_entity_1 = require("../entities/EmergencyFund.entity");
var CustomInstallmentPlan_entity_1 = require("../entities/CustomInstallmentPlan.entity");
var DailyTask_entity_1 = require("../entities/DailyTask.entity");
// Entity imports
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "growup_db",
    synchronize: process.env.NODE_ENV !== "production",
    logging: process.env.NODE_ENV === "development",
    // Both ways of defining entities work - choose one:
    // Option 1: Direct reference to entity classes
    entities: [
        User_entity_1.User,
        Habit_entity_1.Habit,
        SavingsGoal_entity_1.SavingsGoal,
        MajorGoal_entity_1.MajorGoal,
        Notification_entity_1.Notification,
        Installment_entity_1.InstallmentPayment,
        Income_entity_1.Income,
        Expense_entity_1.Expense,
        EmergencyFund_entity_1.EmergencyFund,
        CustomInstallmentPlan_entity_1.CustomInstallmentPlan,
        DailyTask_entity_1.DailyTask
    ],
    // Option 2: File path pattern (comment out the above and uncomment below if preferred)
    // entities: [path.join(__dirname, "entities/*.entity.{js,ts}")],
    migrations: [path_1.default.join(__dirname, "migrations/*.{js,ts}")],
    subscribers: [],
    // SSL configuration (for production)
    ssl: process.env.DB_SSL === "true" ? {
        rejectUnauthorized: false
    } : false,
    // Extra connection options
    extra: {
        connectionLimit: 10,
        connectTimeout: 30000
    },
    // Debugging
    logger: "advanced-console",
    maxQueryExecutionTime: 1000
});
// Optional: Add connection test function
function testConnection() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, exports.AppDataSource.initialize()];
                case 1:
                    _a.sent();
                    console.log("Database connected successfully!");
                    return [2 /*return*/, true];
                case 2:
                    error_1 = _a.sent();
                    console.error("Database connection failed:", error_1);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=data-source.js.map