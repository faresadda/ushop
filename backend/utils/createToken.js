const jwt = require('jsonwebtoken');
require("dotenv").config();

const createToken = async (payload) =>{
  const token = await jwt.sign(
    payload,
    process.env.JWT_SECRET_KEY, 
    )
    return token
}

module.exports = createToken;