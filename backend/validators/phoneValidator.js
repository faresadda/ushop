const { check } = require("express-validator");

const phoneValidator = [
  check("phone")
    .notEmpty()
    .withMessage("phone must be required")
    .isNumeric()
    .withMessage("phone must be a number")
    .matches(/^[0-9]{10}$/)
    .withMessage("phone must consist of 10 numbers")
    .matches(/^0[567]/)
    .withMessage("phone must start with 05, 06, or 07"),
];

module.exports = phoneValidator;
