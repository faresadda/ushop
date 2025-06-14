const { check } = require("express-validator");

const addressValidtor = [

    check("address")
      .notEmpty()
      .withMessage('address must be required')
      
];

module.exports = addressValidtor
