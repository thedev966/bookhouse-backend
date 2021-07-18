const { MongoDataSource } = require("apollo-datasource-mongodb");
const User = require("../../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegistration = require("../../validation/registrationValidation");
const validateLogin = require("../../validation/loginValidation");

class Users extends MongoDataSource {
  // Register an account
  async registerAccount({
    registerInput: { email, password, confirmPassword },
  }) {
    // check for validation
    const errors = validateRegistration(email, password, confirmPassword);
    if (errors.length > 0) {
      // check failed
      return {
        success: false,
        message: "Validation Error",
        errors: errors,
      };
    } else {
      // check passed, proceed >>
      try {
        const isUserExist = await User.findOne({ email });
        if (isUserExist)
          return { success: false, message: "Email already in use!" };
        const hashedPassword = await bcryptjs.hash(password, 12);
        await User.create({ email, password: hashedPassword });
        return { success: true, message: "Your account has been created!" };
      } catch (err) {
        return {
          success: false,
          message: "Error occurred! Please try again." + err,
        };
      }
    }
  }

  // Login the user and return access token
  async loginUser({ loginInput: { email, password } }, { res }) {
    // validation check
    const errors = validateLogin(email, password);
    if (errors.length > 0) {
      // check failed
      return {
        success: false,
        message: "Validation Error",
        errors: errors,
      };
    } else {
      // check passed
      try {
        // check if provided email actually exists in the db
        const user = await User.findOne({ email });
        if (!user)
          return {
            success: false,
            message: "User not found!",
            access_token: "",
          };
        // user does exist, lets compare the passwords
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch)
          return {
            success: false,
            message: "Wrong password!",
            access_token: "",
          };
        // create refresh access token and store it into a cookie
        const refresh_token = jwt.sign(
          { userID: user.id },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "5d",
          }
        );
        // correct password, create jwt access token
        const access_token = jwt.sign(
          { userID: user.id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: 60 * 5,
          }
        );

        // send refresh token cookie and authorization header
        res.cookie("jwt", refresh_token, {
          sameSite: "None",
          maxAge: 3000000,
          secure: true,
          httpOnly: true,
          path: "/",
        });

        res.set("Authorization", "bearer " + access_token);

        return {
          success: true,
          message: "You are logged in.",
          access_token: access_token,
          refresh_token: refresh_token,
          user: user,
        };
      } catch (err) {
        return {
          success: false,
          message: "Error occurred! Please try again.",
          access_token: "",
        };
      }
    }
  }

  // Refresh user's access token if cookie is active
  async refreshToken(req, res) {
    // check if there's cookie
    if (!req.cookies.jwt) {
      return {
        success: false,
        message: "You are not logged in!",
        access_token: "",
      };
    }
    // extract token from cookie and verify it
    try {
      const payload = jwt.verify(
        req.cookies.jwt,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await User.findById(payload.userID);
      if (!user) {
        // corrupted or wrong jwt
        return {
          success: false,
          message: "You are not logged in!",
          access_token: "",
        };
      } else {
        // verified jwt and fetched user object
        // create a new access_token and send it back
        const access_token = jwt.sign(
          { userID: user.id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: 60 * 5,
          }
        );

        res.set("Authorization", "bearer " + access_token);

        return {
          success: true,
          message: "Your access_token has been refreshed!",
          access_token: access_token,
          user: user,
        };
      }
    } catch (err) {
      return {
        success: false,
        message: "You are not logged in!",
        access_token: "",
      };
    }
  }

  // logout functionality
  async logoutUser(res) {
    res.clearCookie("jwt");
    return { message: "You have logged out!" };
  }
}

module.exports = Users;
