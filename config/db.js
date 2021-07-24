const mongoose = require("mongoose");

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_USER_PW = process.env.DB_USER_PW;

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
