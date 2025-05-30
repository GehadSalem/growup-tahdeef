"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./routes/index");
const data_source_1 = require("./dbConfig/data-source");
const error_middleware_1 = require("./Middlewares/error.middleware");
const auth_middleware_1 = require("./Middlewares/auth.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
// CORS configuration
const corsOptions = {
    origin: ((_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')) || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
// DB connection
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('✅ Database connected');
    app.get('/', (req, res) => {
        res.send('تطبيق منظم الحياة الشخصية - API');
    });
    // Public routes
    app.use('/api/auth', index_1.publicRouter);
    // Protected routes
    app.use('/api', (req, res, next) => {
        Promise.resolve((0, auth_middleware_1.authenticate)(req, res, next)).catch(next);
    }, index_1.protectedRouter);
    // Error handler
    app.use(error_middleware_1.globalErrorHandling);
    const server = app.listen(port, '0.0.0.0', () => {
        console.log(`🚀 Server running on http://0.0.0.0:${port}`);
    });
    server.on('error', (error) => {
        console.error('Server error:', error);
    });
})
    .catch((error) => {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
});
// Error safety
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', promise, 'reason:', reason);
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
