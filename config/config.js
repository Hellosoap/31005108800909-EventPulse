require('dotenv').config();
const mongoose = require('mongoose');

// Checks if MONGO_URI exists
if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined.');
}

// Checks if PORT exists
if (!process.env.PORT) {
  throw new Error('PORT is not defined.');
}

const config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
};

module.exports = config;