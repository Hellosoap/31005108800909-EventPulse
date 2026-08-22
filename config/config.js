require('dotenv').config();
const mongoose = require('mongoose');

// Checks if MONGO_URL exists
if (!process.env.MONGO_URL) {
  throw new Error('MONGO_URL is not defined.');
}

// Checks if PORT exists
if (!process.env.PORT) {
  throw new Error('PORT is not defined.');
}

const config = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  nodeEnv: process.env.NODE_ENV || 'development',
};

module.exports = config;