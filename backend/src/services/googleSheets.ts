import { google } from 'googleapis';
import { db } from '../config/firebase';
import dotenv from 'dotenv';

dotenv.config();

const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export const syncGoogleSheets = async () => {
  try {
    const authClient = await auth.getClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Read from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range: 'Vehicles!A2:M', // Adjust range based on your sheet structure
    });

    const rows = response.data.values || [];

    // Parse and upload to Firebase
    for (const row of rows) {
      if (row.length < 10) continue; // Skip incomplete rows

      const vehicleData = {
        vin: row[0],
        year: parseInt(row[1]),
        make: row[2],
        model: row[3],
        type: row[4], // 'car' or 'truck'
        price: parseInt(row[5]),
        mileage: parseInt(row[6]),
        condition: row[7],
        description: row[8],
        sellerType: row[9], // 'dealership' or 'private'
        sellerName: row[10],
        sellerPhone: row[11],
        sellerEmail: row[12],
        location: {
          address: row[13] || '',
          city: 'Lansing',
          state: 'MI',
          zip: row[14] || '',
          latitude: 42.7335,
          longitude: -84.5555,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        sold: false,
      };

      // Check if vehicle already exists by VIN
      const existing = await db.collection('vehicles').where('vin', '==', vehicleData.vin).get();

      if (existing.empty) {
        await db.collection('vehicles').add(vehicleData);
        console.log(`✅ Added vehicle: ${vehicleData.year} ${vehicleData.make} ${vehicleData.model}`);
      }
    }

    console.log('✅ Google Sheets sync completed');
  } catch (error) {
    console.error('❌ Error syncing Google Sheets:', error);
  }
};
