const validateRegistration = require("../validation/registrationValidation");

const resolvers = {
  /* Query resolvers */
  Query: {
    demo: async (_, __, { isAuth, user }) => {
      if (isAuth) {
        return "Hi demo";
      } else {
        return "You are not logged in";
      }
    },
    refreshToken: async (_, __, { dataSources, isAuth, req, res }) => {
      return dataSources.users.refreshToken(req, res);
    },
    logOutUser: async (_, __, { dataSources, res }) => {
      return dataSources.users.logoutUser(res);
    },
    featuredBooks: async (_, { catName }, { dataSources }) => {
      return dataSources.books.fetchFeaturedBooks(catName);
    },
    singleBook: async (_, { bookID }, { dataSources, isAuth }) => {
      return dataSources.books.fetchSingleBook(bookID);
    },
    heroBooks: async (_, __, { dataSources }) => {
      return dataSources.books.fetchHeroBooks();
    },
    orderDetails: async (_, args, context) => {
      return await context.dataSources.books.fetchOrderDetails(args, context);
    },
    allOrders: async (_, args, context) => {
      return await context.dataSources.orders.fetchAllOrders(args);
    },
  },

  /* Mutation resolvers */
  Mutation: {
    registerAccount: (_, args, context) => {
      return context.dataSources.users.registerAccount(args);
    },
    loginUser: (_, args, context) => {
      return context.dataSources.users.loginUser(args, context);
    },
    createCheckoutSession: async (_, args, context) => {
      return await context.dataSources.books.createCheckoutSession(
        args,
        context
      );
    },
    paypalCheckout: async (_, args, context) => {
      return await context.dataSources.orders.paypalCheckout(args);
    },
  },
};

module.exports = resolvers;
