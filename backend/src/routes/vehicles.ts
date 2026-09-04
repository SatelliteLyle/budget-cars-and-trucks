import express, { Request, Response } from 'express';
import { db } from '../config/firebase';
import { Vehicle } from '../types';

const router = express.Router();

// Get all active vehicles
router.get('/', async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('vehicles').where('sold', '==', false).orderBy('createdAt', 'desc').get();
    const vehicles: Vehicle[] = [];
    snapshot.forEach((doc) => {
      vehicles.push({ id: doc.id, ...doc.data() } as Vehicle);
    });
    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

// Search vehicles by filters
router.post('/search', async (req: Request, res: Response) => {
  try {
    const { minPrice = 0, maxPrice = 100000, type = 'both', minYear = 2000 } = req.body;
    
    let query: FirebaseFirestore.Query = db.collection('vehicles').where('sold', '==', false);
    
    if (minPrice) query = query.where('price', '>=', minPrice);
    if (maxPrice) query = query.where('price', '<=', maxPrice);
    if (minYear) query = query.where('year', '>=', minYear);

    const snapshot = await query.get();
    const vehicles: Vehicle[] = [];
    
    snapshot.forEach((doc) => {
      const vehicle = { id: doc.id, ...doc.data() } as Vehicle;
      if (type === 'both' || vehicle.type === type) {
        vehicles.push(vehicle);
      }
    });

    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error searching vehicles:', error);
    res.status(500).json({ error: 'Failed to search vehicles' });
  }
});

// Mark vehicle as sold
router.patch('/:id/sold', async (req: Request, res: Response) => {
  try {
    await db.collection('vehicles').doc(req.params.id).update({
      sold: true,
      updatedAt: new Date(),
    });
    res.status(200).json({ message: 'Vehicle marked as sold' });
  } catch (error) {
    console.error('Error marking vehicle as sold:', error);
    res.status(500).json({ error: 'Failed to mark vehicle as sold' });
  }
});

export default router;
