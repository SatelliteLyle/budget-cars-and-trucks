# Google Sheets Setup Guide

## How to Connect Your Google Sheet

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Used Cars Inventory"
3. Rename the first sheet to "Vehicles"

### Step 2: Create Column Headers
In row 1, add these headers:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| VIN | Year | Make | Model | Type | Price | Mileage | Condition | Description | SellerType | SellerName | SellerPhone | SellerEmail | Address | Zip |

### Step 3: Add Your Vehicles
Example row:
```
JH2RC5104LM100001 | 2020 | Honda | Civic | car | 12500 | 65000 | good | Well maintained, clean interior | dealership | ABC Motors | 517-555-1234 | sales@abcmotors.com | 123 Main St | 48912
```

### Step 4: Get Your Sheet ID
- Your sheet URL looks like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
- Copy the `SHEET_ID_HERE` part
- Add to `.env` as: `GOOGLE_SHEET_ID=SHEET_ID_HERE`

### Step 5: Set Up Service Account (For API Access)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable "Google Sheets API"
4. Create a Service Account:
   - Go to Credentials
   - Click "Create Credentials" → "Service Account"
   - Download the JSON key file
5. Save the JSON as `google-service-account.json` in your backend folder
6. Add to `.env`: `GOOGLE_SERVICE_ACCOUNT_KEY=/path/to/google-service-account.json`

### Step 6: Share Sheet with Service Account
1. Open your Google Sheet
2. Click "Share"
3. Copy the "client_email" from your service account JSON
4. Paste it as an email and give "Editor" access
5. Done!

## How It Works

✅ Bot reads your Google Sheet every hour
✅ New vehicles are automatically added to the database
✅ You can update vehicles directly in Google Sheets
✅ No coding required!

## Quick Add Template

Just copy this template and fill it in:

```
VIN | Year | Make | Model | Type | Price | Mileage | Condition | Description | SellerType | SellerName | SellerPhone | SellerEmail | Address | Zip
```

## Sync Frequency

- Automatic sync every **1 hour**
- Manual sync available via: `POST /api/sync-sheets`

---

**That's it! Your inventory will sync automatically.**
