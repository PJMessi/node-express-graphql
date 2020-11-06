import Event from '../../models/event';
import User from '../../models/user';
import { eventResource } from '../../helpers/model';

const resolvers = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return eventResource(event);
      });
    } catch (err) {
      throw err;
    }
  },

  createEvent: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated.')
    }

    try {
      let event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: req.authUser._id,
      });
      event = await event.save();

      // Pushing event to Users
      const user = await User.findOne({ _id: event.creator }).exec();
      if (!user) {
        throw new Error('User not found.');
      }
      user.createdEvents.push(event);
      user.save();

      return eventResource(event);
    } catch (err) {
      throw err;
    }
  },

  deleteEvent: async(args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated.')
    }
    
    await Event.deleteOne({_id: args.eventId, creator: req.authUser._id})

    return true
  }
};

module.exports = resolvers;
