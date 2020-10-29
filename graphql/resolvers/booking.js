import Booking from '../../models/booking';
import { bookingResource } from '../../helpers/model';

const resolvers = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return bookingResource(booking);
      });
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

      return bookingResource(booking);
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

      return eventResource(event);
    } catch (err) {
      throw err;
    }
  },
};

module.exports = resolvers;
