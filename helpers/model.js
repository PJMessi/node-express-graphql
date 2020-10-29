import {dateToString} from '../helpers/date'
import Event from '../models/event';
import Booking from '../models/booking';
import User from '../models/user';

const fetchSingleUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return userResource(user);
  } catch (err) {
    throw err;
  }
};

const fetchSingleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return eventResource(event);
  } catch (err) {
    throw err;
  }
};

const fetchMultipleEvents = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return eventResource(event);
    });
  } catch (err) {
    throw err;
  }
};

const eventResource = (event) => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    creator: () => fetchSingleUser(event.creator),
  };
};

const bookingResource = (booking) => {
  return {
    ...booking._doc,
    _id: booking._id,
    user: () => fetchSingleUser(booking._doc.user),
    event: () => fetchSingleEvent(booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

const userResource = (user) => {
  return {
    ...user._doc,
    createdEvents: () => fetchMultipleEvents(user._doc.createdEvents),
  };
};

export {
  fetchSingleUser,
  fetchSingleEvent,
  fetchMultipleEvents,
  eventResource,
  bookingResource,
  userResource,
};
