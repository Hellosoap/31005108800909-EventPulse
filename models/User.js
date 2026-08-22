const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Please, enter your name.'],
    trim: true
  },
  email:{
    type: String,
    required: [true, 'Please, enter your email.'],
    trim: true,
    unique: true,
    lowercase: true
  },
  password:{
    type: String,
    required: [true, 'Please, enter your password.'],
    select: false
  },
  role:{
    type: String,
    enum: ['attendee', 'admin'],
    default: 'attendee'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);