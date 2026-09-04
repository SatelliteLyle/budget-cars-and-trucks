import express, { Request, Response } from 'express';
import { db } from '../config/firebase';
import { Inquiry } from '../types';

const router = express.Router();

// Create inquiry from web form
router.post('/', async (req: Request, res: Response) => {
  try {
    const { buyerName, buyerEmail, buyerPhone, vehicleId, message } = req.body;

    const inquiryData: Omit<Inquiry, 'id'> = {
      buyerId: 'contact-' + Date.now(),
      vehicleId,
      buyerName,
      buyerEmail,
      buyerPhone,
      message,
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await db.collection('inquiries').add(inquiryData);

    // Send notification to facilitator
    console.log(`\n📱 NEW INQUIRY\nName: ${buyerName}\nPhone: ${buyerPhone}\nEmail: ${buyerEmail}\n`);

    res.status(201).json({ id: docRef.id, ...inquiryData });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ error: 'Failed to create inquiry' });
  }
});

// Get all inquiries for admin
router.get('/', async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('inquiries').orderBy('createdAt', 'desc').get();
    const inquiries: Inquiry[] = [];
    snapshot.forEach((doc) => {
      inquiries.push({ id: doc.id, ...doc.data() } as Inquiry);
    });
    res.status(200).json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

export default router;
