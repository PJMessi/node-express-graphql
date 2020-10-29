import User from '../../models/user';
import bcrypt from 'bcrypt';
import { userResource } from '../../helpers/model';

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
};

module.exports = resolvers;
