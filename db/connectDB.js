const mongoose = require('mongoose');
const config = require('../config/config');

const connectDB = async () => {
    try {
      await mongoose.connect(config.mongoUri);
      console.log('MongoDB Connected...');
    } catch (err) {
      console.error('Database connection failed: ', err.message);
      process.exit(1);
    }
};

module.exports = connectDB;