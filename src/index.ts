import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import { publicRouter } from './routes/index';
import { protectedRouter } from './routes/index';
import { AppDataSource } from './dbConfig/data-source';
import { globalErrorHandling } from './Middlewares/error.middleware';
import { authenticate } from './Middlewares/auth.middleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enhanced CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*', // You can specify domains
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // If you need to support credentials
};

// Apply CORS middleware before other middleware
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (outside DB connection check)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');

    // Main route
    app.get('/', (req, res) => {
      res.send('تطبيق منظم الحياة الشخصية - API');
    });

    // API Routes
    app.use('/api/auth', publicRouter);
    
    // Protected routes (require auth)
    app.use('/api', protectedRouter); // Added authenticate middleware here

    // Global error handler
    app.use(globalErrorHandling);

    // Start server
    const server = app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });

    // Handle server errors
    server.on('error', (error) => {
      console.error('Server error:', error);
    });
  })
  .catch((error: Error) => {
    console.error('❌ Database connection failed', error);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});