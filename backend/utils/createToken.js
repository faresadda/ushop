const jwt = require('jsonwebtoken');
require("dotenv").config();

const createToken = async (payload) =>{
  const token = await jwt.sign(
    payload,
    process.env.jwt_secret_key, 
    {expiresIn: process.env.jwt_expire_time}
    )
    return token
}

module.exports = createToken;