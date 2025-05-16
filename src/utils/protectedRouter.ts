// utils/protectedRouter.ts
import { Router } from 'express';
import { asyncHandler } from '../Middlewares/error.middleware';
import {authenticate} from '../Middlewares/auth.middleware';

const protectedRouter = Router();


// Apply authentication to all routes using this router
protectedRouter.use(asyncHandler(authenticate));


export default protectedRouter;