import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/index';
import habitRoutes from './routes/index';
import expenseRoutes from './routes/index';
import goalRoutes from './routes/index';
import emergencyRoutes from './routes/index';
import notificationRoutes from './routes/index';
import dailyTaskRoutes from './routes/index';
import { AppDataSource } from './dbConfig/data-source';

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());
AppDataSource.initialize()
  .then(() => {
    console.log(' Database connected');

    app.get('/', (req, res) => {
      res.send('تطبيق منظم الحياة الشخصية - API');
    });

    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'healthy' });
    });

    app.use('/api/auth', authRoutes);
    app.use('/api/habits', habitRoutes);
    app.use('/api/expenses', expenseRoutes);
    app.use('/api/goals', goalRoutes);
    app.use('/api/emergencyFund', emergencyRoutes);
    app.use('/api/notifications', notificationRoutes);
    app.use('/api/dailyTasks', dailyTaskRoutes);

    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  })
  .catch((error: any) => console.error('❌ Database connection failed', error));


