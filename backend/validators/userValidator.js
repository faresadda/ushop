const { check } = require("express-validator");
const userValidator = [

  check("gender").notEmpty().withMessage("gender is required"),

  check("birthday").notEmpty().withMessage("birthday is required"),

  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isLowercase()
    .withMessage("email must be in lowercase")
    .matches(/^\S+$/)
    .withMessage("email must not contain spaces")
    .isEmail()
    .withMessage("email is not valid")
    .trim(),
];
module.exports = userValidator;
