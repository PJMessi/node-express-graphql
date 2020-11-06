import Booking from '../../models/booking';
import Event from '../../models/event'
import { bookingResource, eventResource } from '../../helpers/model';

const resolvers = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated.')
    }

    try {
      const bookings = await Booking.find({user: req.authUser._id});
      return bookings.map((booking) => {
        return bookingResource(booking);
      });
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated.')
    }

    try {
      const event = await Event.findOne({ _id: args.eventId });

      // checking if user already has booked the event.
      const hasALreadyBooked = await Booking.findOne({event: event._id, user: req.authUser._id})
      if (hasALreadyBooked) {
        throw new Error('Event already booked.')
      }

      if (req.authUser._id == event.creator) {
        throw new Error('User cannot book his own event.')
      }

      let booking = new Booking({
        user: req.authUser._id,
        event: event,
      });

      booking = await booking.save();

      return bookingResource(booking);
    } catch (err) {
      throw err;
    }
  },

  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated.')
    }

    try {
      const booking = await Booking.findOne({ _id: args.bookingId, user: req.authUser._id }).populate(
        'event'
      );

      if (!booking) {
        throw new Error('booking not found')
      }

      const event = booking.event;
      await Booking.deleteOne({ _id: booking._id });

      return eventResource(event);
    } catch (err) {
      throw err;
    }
  },
};

module.exports = resolvers;
