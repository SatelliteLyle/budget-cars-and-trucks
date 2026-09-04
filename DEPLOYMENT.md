# DEPLOYMENT GUIDE

## Quick Start

### Prerequisites
- Node.js 18+
- Firebase account (free tier works)
- Telegram Bot Token
- Google Sheet ID

### Backend Deployment (Railway or Render - FREE)

#### Option 1: Railway (Recommended)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project
4. Connect your GitHub repo
5. Add environment variables:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_PRIVATE_KEY`
   - `FIREBASE_CLIENT_EMAIL`
   - `TELEGRAM_BOT_TOKEN`
   - `GOOGLE_SHEET_ID`
   - `PORT=5000`
6. Deploy!

#### Option 2: Render

1. Go to [render.com](https://render.com)
2. Sign up
3. Create new Web Service
4. Connect GitHub
5. Build command: `npm install && npm run build`
6. Start command: `npm start`
7. Add same env vars
8. Deploy!

### Frontend Deployment (Vercel - FREE)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import project
4. Add env vars:
   - `VITE_API_URL=https://your-backend-url.railway.app/api`
   - `VITE_GOOGLE_MAPS_API_KEY`
5. Deploy!

### Telegram Bot Setup

1. Chat with @BotFather on Telegram
2. Send `/newbot`
3. Name it: "UsedCars&TrucksLansingBot"
4. Copy the token
5. Add to `.env`: `TELEGRAM_BOT_TOKEN=your_token_here`

### Google Sheets Setup

1. Create Google Sheet: "Used Cars Inventory"
2. Add headers and sample vehicles
3. Get Sheet ID from URL
4. Set up Service Account (see GOOGLE_SHEETS_SETUP.md)

### Firebase Setup

1. Go to [firebase.google.com](https://firebase.google.com)
2. Create new project
3. Enable Firestore Database
4. Go to Project Settings
5. Create Service Account
6. Download JSON key
7. Extract credentials and add to `.env`

## Environment Variables Template

```bash
# Server
PORT=5000
NODE_ENV=production

# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----...-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase@your-project.iam.gserviceaccount.com
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token_here

# Google Sheets
GOOGLE_SHEET_ID=your-sheet-id
GOOGLE_SERVICE_ACCOUNT_KEY=/path/to/key.json

# Contact Info
FACILITATOR_PHONE=517-939-9847
FACILITATOR_EMAIL=satellitelyle@gmail.com
```

## Testing

### Test Backend
```bash
curl http://localhost:5000/health
```

### Test Telegram Bot
1. Search for @UsedCars&TrucksLansingBot
2. Send `/start`
3. Try `/search`

### Test Frontend
```bash
cd frontend
npm run dev
```

## Post-Deployment

✅ Test all APIs
✅ Test Telegram bot commands
✅ Verify Google Sheets sync
✅ Confirm email notifications work
✅ Test payment info display
✅ Verify contact form submission

## Troubleshooting

**Bot not responding:**
- Check TELEGRAM_BOT_TOKEN is correct
- Verify backend is running
- Check console logs

**Google Sheets not syncing:**
- Verify GOOGLE_SHEET_ID is correct
- Check Service Account has access
- Verify column headers match

**Firebase connection error:**
- Check credentials are correct
- Verify Firebase project exists
- Check internet connection

## Support

📱 Phone: 517-939-9847
📧 Email: satellitelyle@gmail.com
🤖 Telegram: @UsedCars&TrucksLansingBot
