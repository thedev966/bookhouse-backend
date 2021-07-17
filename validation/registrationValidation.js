const validator = require("validator");
const Error = require("./Error");

const validateRegistration = (email, password, confirmPassword) => {
  let errors = [];

  // validate email
  if (validator.isEmpty(email)) {
    errors.push(new Error("email", "Email field is empty!"));
  } else if (!validator.isEmail(email)) {
    errors.push(new Error("email", "Email format is not valid!"));
  } else if (!validator.isLength(email, { max: 50 })) {
    errors.push(new Error("email", "Email is too long!"));
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

  // validate confirm password
  if (validator.isEmpty(confirmPassword)) {
    errors.push(
      new Error("confirmPassword", "Confirm Password field is empty!")
    );
  } else if (!validator.equals(password, confirmPassword)) {
    errors.push(new Error("confirmPassword", "Passwords do not match!"));
  }

  return errors;
};

module.exports = validateRegistration;
