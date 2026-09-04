import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeFirebase } from './config/firebase';
import { startTelegramBot } from './services/telegram';
import { syncGoogleSheets } from './services/googleSheets';
import vehicleRoutes from './routes/vehicles';
import inquiryRoutes from './routes/inquiries';
import paymentRoutes from './routes/payments';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Firebase
initializeFirebase();

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: '✅ Bot is running', 
    timestamp: new Date(),
    telegram: '@UsedCars&TrucksLansingBot',
    contact: '517-939-9847'
  });
});

// Sync Google Sheets on startup
syncGoogleSheets().catch(console.error);

// Sync Google Sheets every hour
setInterval(() => {
  syncGoogleSheets().catch(console.error);
}, 3600000);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🤖 Telegram Bot: @UsedCars&TrucksLansingBot`);
  console.log(`📱 Phone: 517-939-9847`);
  console.log(`📧 Email: satellitelyle@gmail.com`);
});

// Start Telegram bot
startTelegramBot();

export default app;
