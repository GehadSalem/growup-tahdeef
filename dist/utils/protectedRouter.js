"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// utils/protectedRouter.ts
const express_1 = require("express");
const error_middleware_1 = require("../Middlewares/error.middleware");
const auth_middleware_1 = require("../Middlewares/auth.middleware");
const protectedRouter = (0, express_1.Router)();
// Apply authentication to all routes using this router
protectedRouter.use((0, error_middleware_1.asyncHandler)(auth_middleware_1.authenticate));
// 
exports.default = protectedRouter;
