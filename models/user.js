import Mongoose from 'mongoose'

const Schema = new Mongoose.Schema({
    email: {
        type: String,
        required: true,
        maxlength: 255,
        unique: true
    },

    password: {
        type: String,
        required: true,
        maxlength: 255
    },

    createdEvents: [
        {
            type: Mongoose.ObjectId,
            ref: 'Event'
        }
    ]
})

// Defining the User model.
const User = Mongoose.model('User', Schema);

module.exports = User