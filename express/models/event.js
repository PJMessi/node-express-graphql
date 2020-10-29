import Mongoose from 'mongoose';

// Configuring schema for Event Model.
const Schema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },

  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },

  price: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  creator: {
    type: Mongoose.ObjectId,
    ref: 'User'
  }
});


// Defining the Event model.
const Event = Mongoose.model('Event', Schema);

module.exports = Event