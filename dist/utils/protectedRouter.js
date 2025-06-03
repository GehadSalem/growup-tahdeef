"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// utils/protectedRouter.ts
var express_1 = require("express");
var error_middleware_1 = require("../Middlewares/error.middleware.js");
var auth_middleware_1 = require("../Middlewares/auth.middleware.js");
var protectedRouter = (0, express_1.Router)();
// Apply authentication to all routes using this router
protectedRouter.use((0, error_middleware_1.asyncHandler)(auth_middleware_1.authenticate));
// 
exports.default = protectedRouter;
//# sourceMappingURL=protectedRouter.js.map