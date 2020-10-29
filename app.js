// Importing dependencies.
import express from 'express';
import 'dotenv/config';
import { graphqlHTTP } from 'express-graphql';
import Mongoose from 'mongoose';
import graphqlSchema from './graphql/schemas/index';
import graphqlResolvers from './graphql/resolvers/index'
import authMiddleware from './middlewares/auth'

// Initializing express.
const app = express();

// Using auth middleware.
app.use(authMiddleware)


// Setting up Graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

// Connecting mongo db.
Mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true })
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
