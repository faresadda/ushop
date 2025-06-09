const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const User = require("../models/userModel");
require("dotenv").config();

const authorizationUser = asyncHandler(async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    throw appError.createError(400, "Please login first");
  }

  const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(verifyToken);
  if (!verifyToken) {
    throw appError.createError(400, "Invalid token");
  }

  // Set user data in request
  req.user = verifyToken;
  next();
});

const authorizationAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user.id) {
    throw appError.createError(400, "Please login first");
  }

  // Verify user role from database
  const user = await User.findById(req.user.id).select("role");
  if (!user && user.role !== "admin") {
    throw appError.createError(403, "Access denied. Admin privileges required");
  }

  next();
});

module.exports = {
  authorizationUser,
  authorizationAdmin,
};
