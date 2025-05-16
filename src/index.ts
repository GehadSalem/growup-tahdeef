import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";

// import habitRouter from './routes/habits.routes'
// import expenseRouter from './routes/expense.routes'

import authRouter from './routes/index';
import protectedRouter from './routes/index';
import { AppDataSource } from './dbConfig/data-source';
import { globalErrorHandling } from './Middlewares/error.middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');

    // Health checks
  app.use(cors());

    app.get('/', (req, res) => {
      res.send('تطبيق منظم الحياة الشخصية - API');
    });
    // API Routes
    app.use('/api/auth', authRouter);
    app.use('/api/', protectedRouter);

    // Global error handler
    app.use(globalErrorHandling);

    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('❌ Database connection failed', error);
    process.exit(1);
  });