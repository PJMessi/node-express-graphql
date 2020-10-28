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

const events = []

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

      events: () => {
        const events = Event.find()
        return events
      },

      createEvent: async (args) => {
          try {
              const event = new Event({
                  title: args.eventInput.title,
                  description: args.eventInput.description,
                  price: args.eventInput.price,
                  date: new Date(args.eventInput.date)
              })
              await event.save()
              return event;

          } catch (err) {
            throw err
          }
      },

      createUser: async (args) => {
        try {
            // Hashing password.
            const password = await bcrypt.hash(args.userInput.password, 10);

            let user = new User({
                email: args.userInput.email,
                password: password
            })

            user = await user.save()

            return {...user._doc, password:null};

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
