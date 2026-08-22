const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title:{
    type: String,
    trim: true,
    required: [true, 'Please, enter the name of the event.']
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Please, enter the description of the event.']
  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please, enter the category of the event.']
  },
  date:{
    type: Date,
    required: [true, 'Please, enter the date of the event.']
  },
  city:{
    type: String,
    trim: true,
    required: [true, 'Please, enter the city of the event.']
  },
  venue:{
    type: String,
    trim: true,
    required: [true, 'Please, enter the venue of the event.']
  },
  capacity:{
    type: Number,
    min: [1,'The capacity must at least be 1 person.'],
    required: [true, 'Please, enter the capacity of the event.']
  },
  organizer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please, enter the organizer ID of the event.']
  },
  registrations: {
    type: Number,
    default: 0
  }
}, {timestamps: true});

module.exports = mongoose.model('Event', eventSchema);