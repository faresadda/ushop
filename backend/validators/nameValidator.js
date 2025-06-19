const { check } = require("express-validator");
const nameValidator = [
  check("firstName")
    .notEmpty()
    .withMessage("first name is required")
    .isLength({ min: 2 })
    .withMessage("first name is too short")
    .trim()
    .custom((value) => {
      if (/\d/.test(value)) {
        throw new Error("first name must not contain numbers");
      }
      if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        throw new Error("first name must not contain special characters");
      }
      return true;
    }),

  check("lastName")
    .notEmpty()
    .withMessage("last name is required")
    .isLength({ min: 2 })
    .withMessage("last name is too short")
    .trim()
    .custom((value) => {
      if (/\d/.test(value)) {
        throw new Error("last name must not contain numbers");
      }
      if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        throw new Error("last name must not contain special characters");
      }
      return true;
    }),
];
module.exports = nameValidator;