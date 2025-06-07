"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var index_1 = require("./routes/index");
var data_source_1 = require("./dbConfig/data-source");
var error_middleware_1 = require("./Middlewares/error.middleware");
var auth_middleware_1 = require("./Middlewares/auth.middleware");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = Number(process.env.PORT) || 3000;
var allowedOrigins = ((_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')) || [];
// allowedOrigins.push('http://31.97.55.57');
// CORS configuration
var corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check
app.get('/health', function (req, res) {
    res.status(200).json({ status: 'ok' });
});
// DB connection
data_source_1.AppDataSource.initialize()
    .then(function () {
    console.log('✅ Database connected');
    app.get('/', function (req, res) {
        res.send('تطبيق منظم الحياة الشخصية - API');
    });
    // Public routes
    app.use('/api/auth', index_1.publicRouter);
    // Protected routes
    app.use('/api', function (req, res, next) {
        Promise.resolve((0, auth_middleware_1.authenticate)(req, res, next)).catch(next);
    }, index_1.protectedRouter);
    // Error handler
    app.use(error_middleware_1.globalErrorHandling);
    var server = app.listen(port, '0.0.0.0', function () {
        console.log("Server running on port ".concat(port));
    });
    server.on('error', function (error) {
        console.error('Server error:', error);
    });
})
    .catch(function (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
});
// Error safety
process.on('unhandledRejection', function (reason, promise) {
    console.error('Unhandled Rejection:', promise, 'reason:', reason);
});
process.on('uncaughtException', function (error) {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map