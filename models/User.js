const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    default: "-",
  },
  lastName: {
    type: String,
    default: "-",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 18,
  },
  gender: {
    type: String,
    default: "male",
  },
  avatar: {
    type: String,
    default:
      "https://comicvine1.cbsistatic.com/uploads/original/1/19151/375797-162505-selene.jpg",
  },
});

module.exports = mongoose.model("users", userSchema);
