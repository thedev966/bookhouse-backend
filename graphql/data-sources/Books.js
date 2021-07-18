const { MongoDataSource } = require("apollo-datasource-mongodb");
const Book = require("../../models/Book");
const Order = require("../../models/Order");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

class Books extends MongoDataSource {
  async fetchFeaturedBooks(catName) {
    try {
      const featuredBooks = await Book.find({ category: catName }).limit(5);
      return {
        success: true,
        books: featuredBooks,
      };
    } catch (err) {
      return {
        success: false,
        books: [],
      };
    }
  }

  async fetchSingleBook(bookID) {
    try {
      const book = await Book.findById(bookID);
      return {
        success: true,
        bookDetails: book,
      };
    } catch (err) {
      return {
        success: false,
        bookDetails: null,
      };
    }
  }

  async fetchHeroBooks() {
    try {
      const books = await Book.find().sort({ _id: -1 }).limit(4);
      return {
        success: true,
        heroBooks: books,
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        heroBooks: [],
      };
    }
  }

  async createCheckoutSession({ createCheckoutSessionInput }, { res }) {
    const products = [];
    const DOMAIN = process.env.CLIENT_URI;

    createCheckoutSessionInput.forEach((p) => {
      products.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: p.title,
            images: [`${p.cover}`],
          },
          unit_amount: Math.round(p.price * 100),
        },
        quantity: p.quantity,
      });
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products,
      mode: "payment",
      success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}`,
    });

    return { sessionUrl: session.url };
  }

  async fetchOrderDetails({ orderDetailsInput }, context) {
    try {
      const session = await stripe.checkout.sessions.retrieve(
        orderDetailsInput.sessionID
      );
      const items = await stripe.checkout.sessions.listLineItems(
        orderDetailsInput.sessionID
      );
      let orderItems = [];
      items.data.forEach((i) => {
        orderItems.push({
          title: i.description,
          quantity: i.quantity,
        });
      });
      const order = {
        orderID: session.payment_intent,
        buyerID: orderDetailsInput.userID,
        method: "Stripe",
        items: orderItems,
        total: `$${session.amount_total / 100}`,
        status: session.payment_status,
      };
      // check if this order already exists in the db
      const orderCheck = await Order.findOne({
        orderID: session.payment_intent,
      });
      if (!orderCheck) {
        await Order.create(order);
        return {
          success: true,
          message: "Your purchase was completed succesfully!",
          orderID: session.payment_intent,
        };
      } else {
        return {
          success: false,
          message: "Order already exists in our database!",
          orderID: "",
        };
      }
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Error occurred while proccessing your request!",
        orderID: "",
      };
    }
  }
}

module.exports = Books;
