import User from '../../models/user';
import bcrypt from 'bcrypt';
import { userResource } from '../../helpers/model';
import jwt from 'jsonwebtoken';

const resolvers = {
  createUser: async (args) => {
    try {
      // Hashing password.
      const password = await bcrypt.hash(args.userInput.password, 10);

      let user = new User({
        email: args.userInput.email,
        password: password,
      });

      user = await user.save();
      return userResource(user);
    } catch (err) {
      throw err;
    }
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email })
    if (!user) {
      throw new Error('Invalid Username or Password.')
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      throw new Error('Invalid Username or Password..')
    }
    
    const token = user.generateAuthToken()

    return {
      user: userResource(user),
      token: token,
      tokenExpiration: process.env.JWT_EXPIRATION_TIME 
    }

  },
};

module.exports = resolvers;
