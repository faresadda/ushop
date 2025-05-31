const { check } = require("express-validator");
const userValidator = [
  check("firstName")
    .notEmpty()
    .withMessage("first name is required")
    .isLength({ min: 2 })
    .withMessage("first name is too short")
    .trim(),

  check("lastName")
    .notEmpty()
    .withMessage("last name is required")
    .isLength({ min: 2 })
    .withMessage("last name is too short")
    .trim(),

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
    .withMessage("email is not valid"),
];
module.exports = userValidator;
