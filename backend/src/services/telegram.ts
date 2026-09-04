import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { db } from '../config/firebase';
import axios from 'axios';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN || '';
const bot = new TelegramBot(token, { polling: true });

interface UserState {
  minPrice?: number;
  maxPrice?: number;
  vehicleType?: string;
}

const userStates = new Map<number, UserState>();

export const startTelegramBot = () => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      `🚗 Welcome to Used Cars & Trucks for Sale!

I'm here to help you find affordable vehicles in Lansing, Michigan.

🔍 Commands:
/search - Find vehicles
/preferences - Set your budget & preferences
/interested - Show interest in a vehicle
/contact - Get facilitator contact info
/help - Show all commands`,
      {
        reply_markup: {
          keyboard: [
            [{ text: '/search' }, { text: '/contact' }],
            [{ text: '/interested' }, { text: '/help' }]
          ]
        }
      }
    );
  });

  bot.onText(/\/search/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '💰 What\'s your budget range?\n\nReply with: 3000-8000 (min-max)');
  });

  bot.onText(/\d+-\d+/, async (msg, match) => {
    const chatId = msg.chat.id;
    const [minPrice, maxPrice] = msg.text!.split('-').map(Number);

    userStates.set(chatId, { minPrice, maxPrice });
    bot.sendMessage(chatId, '🚙 What type of vehicle?\n\n/car - Car\n/truck - Truck\n/both - Both');
  });

  bot.onText(/\/car|car/i, (msg) => {
    const chatId = msg.chat.id;
    const state = userStates.get(chatId) || {};
    userStates.set(chatId, { ...state, vehicleType: 'car' });
    searchVehicles(chatId, state as UserState);
  });

  bot.onText(/\/truck|truck/i, (msg) => {
    const chatId = msg.chat.id;
    const state = userStates.get(chatId) || {};
    userStates.set(chatId, { ...state, vehicleType: 'truck' });
    searchVehicles(chatId, state as UserState);
  });

  bot.onText(/\/both|both/i, (msg) => {
    const chatId = msg.chat.id;
    const state = userStates.get(chatId) || {};
    userStates.set(chatId, { ...state, vehicleType: 'both' });
    searchVehicles(chatId, state as UserState);
  });

  bot.onText(/\/contact/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      `📱 Contact Information

☎️ Phone: 517-939-9847
📧 Email: satellitelyle@gmail.com

💳 Payment Methods:
🟪 Square
📱 Venmo: @satellitelyle
📱 Cash App: $satellitelyle
🏦 Zelle: satellitelyle@gmail.com
💵 Cash (in-hand)
💰 Money Order
💳 Cashier's Check`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '📞 Call Now', url: 'tel:5179399847' }],
            [{ text: '💬 Text Now', url: 'sms:5179399847' }],
            [{ text: '📧 Email', url: 'mailto:satellitelyle@gmail.com' }]
          ]
        }
      }
    );
  });

  bot.onText(/\/interested/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      `✋ Interested in a vehicle?\n\nReply with:\n- Vehicle ID (or description)\n- Your name\n- Your phone number`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🌐 Browse Online', url: 'https://your-website.com/browse' }]
          ]
        }
      }
    );
  });

  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      `📖 Available Commands:

/start - Welcome message
/search - Search for vehicles
/car - Show cars
/truck - Show trucks
/both - Show both
/contact - Contact info & payment methods
/interested - Express interest
/help - This menu`,
      {
        reply_markup: {
          keyboard: [
            [{ text: '/search' }, { text: '/contact' }],
            [{ text: '/interested' }, { text: '/help' }]
          ]
        }
      }
    );
  });

  console.log('✅ Telegram bot started: @UsedCars&TrucksLansingBot');
};

const searchVehicles = async (chatId: number, filters: UserState) => {
  try {
    const query = db.collection('vehicles').where('sold', '==', false);
    const snapshot = await query.get();
    const vehicles = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (
        data.price >= (filters.minPrice || 0) &&
        data.price <= (filters.maxPrice || 100000) &&
        (filters.vehicleType === 'both' || data.type === filters.vehicleType)
      ) {
        vehicles.push({ id: doc.id, ...data });
      }
    });

    if (vehicles.length === 0) {
      bot.sendMessage(chatId, '😔 No vehicles found matching your criteria. Try adjusting your filters!');
      return;
    }

    let message = `🎉 Found ${vehicles.length} vehicles!\n\n`;
    vehicles.slice(0, 5).forEach((v, i) => {
      message += `${i + 1}. ${v.year} ${v.make} ${v.model}\n   💰 $${v.price.toLocaleString()}\n   📍 ${v.location.city}\n\n`;
    });

    message += '📱 Call or text to inquire: 517-939-9847';
    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error('Error searching vehicles:', error);
    bot.sendMessage(chatId, '❌ Error searching vehicles. Please try again.');
  }
};

export default bot;
