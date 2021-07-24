const mongoose = require("mongoose");

const DB_NAME = "ecommerce-mern";
const DB_USER = "ecommerce-mern";
const DB_USER_PW = "ZlrtLjl6x0cGKk8Y";

const DB_URI = `mongodb+srv://${DB_USER}:${DB_USER_PW}@cluster0.prbks.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

module.exports = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to the database was established");
  } catch (err) {
    console.log(err);
  }
};
