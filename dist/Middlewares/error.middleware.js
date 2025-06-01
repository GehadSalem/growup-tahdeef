"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandling = exports.asyncHandler = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: err.message || 'حدث خطأ في الخادم'
    });
};
exports.errorHandler = errorHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
const globalErrorHandling = (err, req, res, next) => {
    const statusCode = err.cause || 500;
    const response = {
        message: err.message,
        success: false,
    };
    if (process.env.MODE === 'DEV') {
        response.error = err;
        response.stack = err.stack;
    }
    res.status(statusCode).json(response);
};
exports.globalErrorHandling = globalErrorHandling;
