import bcrypt from 'bcrypt';
import Event from '../../models/event';
import User from '../../models/user';
import Booking from '../../models/booking';

const fetchSingleUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdEvents: () => fetchMultipleEvents(user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

const fetchSingleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return {
      ...event._doc,
      date: new Date(event._doc.date).toISOString(),
      creator: () => fetchSingleUser(event.creator),
    };
  } catch (err) {
    throw err;
  }
};

const fetchMultipleEvents = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: () => fetchSingleUser(event.creator),
      };
    });
  } catch (err) {
    throw err;
  }
};

const resolvers = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return {
          ...event._doc,
          date: new Date(event._doc.date).toISOString(),
          creator: () => fetchSingleUser(event._doc.creator),
        };
      });
    } catch (err) {
      throw err;
    }
  },

  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return {
          ...booking._doc,
          _id: booking._id,
          user: () => fetchSingleUser(booking._doc.user),
          event: () => fetchSingleEvent(booking._doc.event),
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          updatedAt: new Date(booking._doc.updatedAt).toISOString(),
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
      const user = await User.findOne({ _id: event.creator }).exec();
      if (!user) {
        throw new Error('User not found.');
      }
      user.createdEvents.push(event);
      user.save();

      return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: () => fetchSingleUser(event._doc.creator),
      };
    } catch (err) {
      throw err;
    }
  },

  createUser: async (args) => {
    try {
      // Hashing password.
      const password = await bcrypt.hash(args.userInput.password, 10);

      let user = new User({
        email: args.userInput.email,
        password: password,
      });

      user = await user.save();
      return {
        ...user._doc,
        createdEvents: () => fetchMultipleEvents(user._doc.createdEvents),
      };
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async (args) => {
    try {
      const event = await Event.findOne({ _id: args.eventId });

      let booking = new Booking({
        user: '5f998cbdfe6fe1393cdeac04',
        event: event,
      });

      booking = await booking.save();

      return {
        ...booking._doc,
        _id: booking._id,
        user: () => fetchSingleUser(booking._doc.user),
        event: () => fetchSingleEvent(booking._doc.event),
        createdAt: new Date(booking._doc.createdAt).toISOString(),
        updatedAt: new Date(booking._doc.updatedAt).toISOString(),
      };
    } catch (err) {
      throw err;
    }
  },

  cancelBooking: async (args) => {
    try {
      const booking = await Booking.findOne({ _id: args.bookingId }).populate(
        'event'
      );
      const event = booking.event;
      await Booking.deleteOne({ _id: booking._id });

      return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: () => fetchSingleUser(event._doc.creator),
      };
    } catch (err) {
      throw err;
    }
  },
};

module.exports = resolvers;
