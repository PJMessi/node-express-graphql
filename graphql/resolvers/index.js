import bcrypt from 'bcrypt';
import Event from '../../models/event'
import User from '../../models/user';

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdEvents: () => events(user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: () => user(event.creator),
      };
    });
  } catch (err) {
    throw err;
  }
};

const resolvers = {
  events: async () => {
    try {
      let events = await Event.find();
      return events.map((event) => {
        return {
          ...event._doc,
          date: new Date(event._doc.date).toISOString(),
          creator: () => user(event._doc.creator),
        };
      });
    } catch (err) {
      throw err;
    }
  },

  createEvent: async (args) => {
    try {
      let event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: '5f998cbdfe6fe1393cdeac04',
      });
      event = await event.save();

      // Pushing event to Users
      const creator = await User.findOne({ _id: event.creator }).exec();
      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdEvents.push(event);
      creator.save();

      return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: () => user(event._doc.creator),
      };
    } catch (err) {
      throw err;
    }
  },

  createUser: async (args) => {
    try {
      // Hashing password.
      const password = await bcrypt.hash(args.userInput.password, 10);

      const user = new User({
        email: args.userInput.email,
        password: password,
      });

      await user.save();
      return {
        ...user._doc,
        createdEvents: () => events(user._doc.createdEvents),
      };
    } catch (err) {
      throw err;
    }
  },
};

module.exports = resolvers;
