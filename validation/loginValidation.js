const validator = require("validator");
const Error = require("./Error");

const validateLogin = (email, password) => {
  let errors = [];

  // validate email
  if (validator.isEmpty(email)) {
    errors.push(new Error("email", "Email field is empty!"));
  } else if (!validator.isEmail(email)) {
    errors.push(new Error("email", "Email format is not valid!"));
  }

  // validate password
  if (validator.isEmpty(password)) {
    errors.push(new Error("password", "Password field is empty!"));
  } else if (!validator.isLength(password, { min: 8, max: 25 })) {
    errors.push(
      new Error("password", "Password should be between 8 and 25 characters!")
    );
  } else if (
    !validator.matches(password, /^(?=.*[A-Z])(?=.*[!@#$&%*])(?=.*[0-9])/)
  ) {
    errors.push(
      new Error(
        "password",
        "Password should contain at least one number, one uppercase letter and one special character!"
      )
    );
  }

  return errors;
};

module.exports = validateLogin;
