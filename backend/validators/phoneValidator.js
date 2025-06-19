const { check } = require("express-validator");

const phoneValidator = [
  check("phone")
    .notEmpty()
    .withMessage("phone must be required")
    .isNumeric()
    .withMessage("phone must be a number")
    .matches(/^0[567][0-9]{8}$/)
    .withMessage(
      "phone must start with 05, 06, or 07 and consist of 10 numbers"
    ),
];

module.exports = phoneValidator;
