import Event from '../../models/event';
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

      return eventResource(event);
    } catch (err) {
      throw err;
    }
  },
};

module.exports = resolvers;
