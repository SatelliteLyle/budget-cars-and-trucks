import express, { Request, Response } from 'express';

const router = express.Router();

// Get payment methods
router.get('/methods', (req: Request, res: Response) => {
  const paymentMethods = [
    {
      method: 'square',
      name: '🟪 Square',
      icon: '🟪',
      details: 'Click link in confirmation',
    },
    {
      method: 'venmo',
      name: '📱 Venmo',
      icon: '📱',
      details: '@satellitelyle',
    },
    {
      method: 'cashapp',
      name: '📱 Cash App',
      icon: '📱',
      details: '$satellitelyle',
    },
    {
      method: 'zelle',
      name: '🏦 Zelle',
      icon: '🏦',
      details: 'satellitelyle@gmail.com',
    },
    {
      method: 'cash',
      name: '💵 Cash',
      icon: '💵',
      details: 'At time of sale',
    },
    {
      method: 'money_order',
      name: '💰 Money Order',
      icon: '💰',
      details: 'Payable to Satellite Lyle',
    },
    {
      method: 'cashiers_check',
      name: '💳 Cashier\'s Check',
      icon: '💳',
      details: 'Payable to Satellite Lyle',
    },
  ];

  res.status(200).json(paymentMethods);
});

export default router;
