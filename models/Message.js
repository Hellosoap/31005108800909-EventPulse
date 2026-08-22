const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please, enter the user.']
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Please, enter the event ID.']
  },
  text: {
    type: String,
    required: [true, 'Please, write something in the message.'],
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);