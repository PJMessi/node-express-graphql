import { buildSchema } from 'graphql';

const schema = buildSchema(`
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

    type Booking {
        _id: ID!
        user: User!
        event: Event!
        createdAt: String!
        updatedAt: String!
    }

    type AuthData {
        user: User!
        token: String!
        tokenExpiration: Int!
    }

    type RootQuery {
        events: [Event!]!
        bookings: [Booking!]!
        login(email: String!, password: String!): AuthData! 
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event!
        createUser(userInput: UserInput): User!
        bookEvent(eventId: ID!): Booking!
        cancelBooking(bookingId: ID!): Event!
        deleteEvent(eventId: ID!): Boolean!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

module.exports = schema;
