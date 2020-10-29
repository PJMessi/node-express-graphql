import Mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const Schema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    maxlength: 255,
  },

  createdEvents: [
    {
      type: Mongoose.ObjectId,
      ref: 'Event',
    },
  ],
});

/**
 * Generates the auth token for the User.
 * @return {string} [token]
 */
Schema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: `${process.env.JWT_EXPIRATION_TIME}h`,
    }
  );

  return token;
};

// Defining the User model.
const User = Mongoose.model('User', Schema);

module.exports = User;
