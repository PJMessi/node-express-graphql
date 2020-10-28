// Importing dependencies.
import express from 'express';
import 'dotenv/config';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { build } from 'joi';


// Initializing express.
const app = express();

const events = []

// Setting up Routes.
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

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return events
      },
      createEvent: (args) => {
        const event = {
            _id: Math.random().toString(),
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date().toISOString(),
        }
        events.push(event)
        return event;
      },
    },
    graphiql: true,
  })
);

// Starting Server.
const port = process.env.APP_PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
