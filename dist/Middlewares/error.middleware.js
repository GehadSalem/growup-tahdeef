"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandling = exports.asyncHandler = exports.errorHandler = void 0;
var errorHandler = function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        message: err.message || 'حدث خطأ في الخادم'
    });
};
exports.errorHandler = errorHandler;
var asyncHandler = function (fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
var globalErrorHandling = function (err, req, res, next) {
    var statusCode = err.cause || 500;
    var response = {
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
//# sourceMappingURL=error.middleware.js.map