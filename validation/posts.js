const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  //Validation errors for posts input fields
  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 charcters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text is required";
  }

  //return any errors
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
