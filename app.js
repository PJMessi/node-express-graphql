// Importing dependencies.
import express from 'express';
import 'dotenv/config';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import Mongoose from 'mongoose'
import Event from './models/event'
import User from './models/user'
import bcrypt from 'bcrypt'


// Initializing express.
const app = express();

const user = async (userId) => {
  try {
    let user = await User.findById(userId)

    return {
      ...user._doc,
      createdEvents: events.bind(this, user._doc.createdEvents)
    }

  } catch (err) {
    throw err
  }  
}

const events = async(eventIds) => {
  try {
    let events = await Event.find({
      _id: {$in: eventIds}
    })

    events.map(event => {
      return {
        ...event._doc,
        creator: user.bind(this, event.creator)
      }
    })

    return events

  } catch (err) {
    throw err
  }
}


// Setting up Graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
            creator: User!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type User {
          _id: ID!
          email: String!
          createdEvents: [Event!]
        }

        input UserInput {
          email: String!
          password: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {

      events: async () => {
          try {
            const events = await Event.find()
            return events.map(event => {
              return {
                ...event._doc,
                creator: user.bind(this, event._doc.creator)
              }
            })

          } catch (err) {
            throw err;
          }      
      },


      createEvent: async (args) => {
          try {
              const event = new Event({
                  title: args.eventInput.title,
                  description: args.eventInput.description,
                  price: args.eventInput.price,
                  date: new Date(args.eventInput.date),
                  creator: '5f998cbdfe6fe1393cdeac04'
              })
              await event.save()

              // Pushing event to Users
              const user = await User.findOne({_id: event.creator}).exec()      
              if (!user){
                throw new Error('User not found.')
              }
              user.createdEvents.push(event)
              user.save()

              return event;

          } catch (err) {
            throw err
          }
      },

      createUser: async (args) => {
        try {
            // Hashing password.
            const password = await bcrypt.hash(args.userInput.password, 10);

            const user = new User({
                email: args.userInput.email,
                password: password
            })

            await user.save()
            return user

        } catch (err) {
          throw err
        }
    },
    },
    graphiql: true,
  })
);

// Connecting mongo db.
Mongoose
  .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongodb.');
  })
  .catch(() => {
    console.error('Could not connect to Mongodb.');
  });

// Starting Server.
const port = process.env.APP_PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
