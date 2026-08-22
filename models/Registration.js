const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  attendee:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please, enter the user ID.']
  },
  event:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Please, enter the event ID.']
  }
}, { timestamps: true });

registrationSchema.index({event: 1, attendee: 1},{unique: true});
module.exports = mongoose.model('Registration', registrationSchema);