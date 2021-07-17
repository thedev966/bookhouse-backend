const jwt = require("jsonwebtoken");
const User = require("../models/User");

const utils = {
  isAuthenticated: async (tkn) => {
    if (!tkn) return { isAuth: false, user: null };
    // slice bearer token
    const token = tkn.split(" ")[1];
    // verify token to see if it's valid
    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(payload.userID);
      if (!user) {
        return { isAuth: false, user: null };
      } else {
        return { isAuth: true, user: user };
      }
    } catch (err) {
      return { isAuth: false, user: null };
    }
  },
};

module.exports = utils;
