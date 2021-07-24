const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const cookieParser = require("cookie-parser");

// dotenv config
require("dotenv").config();

// apollo data source classes
const Users = require("./graphql/data-sources/Users");
const Books = require("./graphql/data-sources/Books");
const Orders = require("./graphql/data-sources/Orders");

// Connect to the database
require("./config/db")();

// data models
const User = require("./models/User");
const Book = require("./models/Book");
const Order = require("./models/Order");

// require("./seed")();

// utils functions
const { isAuthenticated } = require("./graphql/utils");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const auth_token = req.headers.authorization;
    const { isAuth, user } = await isAuthenticated(auth_token);
    return { req, res, isAuth, user };
  },
  dataSources: () => ({
    users: new Users(User),
    books: new Books(Book),
    orders: new Orders(Order),
  }),
});

const app = express();

app.use(cookieParser());

server.applyMiddleware({
  app,
  path: "/api",
  cors: { origin: process.env.CLIENT_URI, credentials: true },
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server up and running on PORT" + PORT);
});
