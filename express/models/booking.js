import Mongoose from 'mongoose'

const schema = new Mongoose.Schema({
    event: {
        type: Mongoose.ObjectId,
        ref: 'Event'
    },

    user: {
        type: Mongoose.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Defining the Booking model.
const Booking = Mongoose.model('Booking', schema);

module.exports = Booking